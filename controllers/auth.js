const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const db = require('../lib/db.js');

const validator = require('validator');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: 'Please provide both email and password.',
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send({
        message: 'Invalid email format.',
      });
    }

    db.query(
      `SELECT * FROM users WHERE email = ?;`,
      [email],
      (err, result) => {
        if (err) {
          return res.status(400).send({
            message: 'An error occurred while checking the email.',
          });
        }
        if (!result.length) {
          return res.status(400).send({
            message: 'Email or password is incorrect.',
          });
        }

        bcrypt.compare(
          password,
          result[0]['password'],
          (bErr, bResult) => {
            if (bErr) {
              return res.status(400).send({
                message: 'Email or password is incorrect.',
              });
            }
            if (bResult) {
              const token = jwt.sign(
                {
                  email: result[0].email,
                  userId: result[0].id,
                  role: result[0].role,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
              );
              db.query(`UPDATE users SET last_login = now() WHERE id = ?;`, [
                result[0].id,
              ]);
              return res.status(200).send({
                message: 'Logged in!',
                token,
                user: result[0],
              });
            }
            return res.status(400).send({
              message: 'Email or password is incorrect.',
            });
          }
        );
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: 'Internal server error.',
    });
  }
};


exports.signUp = (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        message: 'Please provide your name, email, and password.',
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send({
        message: 'Invalid email format.',
      });
    }

    db.query(
      'SELECT id FROM users WHERE LOWER(email) = LOWER(?)',
      [email],
      (err, result) => {
        if (result && result.length) {
          return res.status(400).send({
            message: 'This email is already in use!',
          });
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                message: err,
              });
            } else {
              db.query(
                'INSERT INTO users (id, name, email, password, role, registered, last_login) VALUES (?, ?, ?, ?, DEFAULT, now(), now());',
                [uuid.v4(), name, email, hash],
                (err, result) => {
                  if (err) {
                    return res.status(400).send({
                      message: err,
                    });
                  }
                  return res.status(201).send({
                    message: 'Registered!',
                  });
                }
              );
            }
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: 'Internal server error.',
    });
  }
};


exports.updateUser = (req, res) => {

  const { id, name } = req.body;

  db.query(
    `UPDATE users SET name = ? WHERE id = ?`,
    [name, id],
    (err, result) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      if(result){
        db.query(
          `SELECT * FROM users WHERE id = ?;`,
          [id],
          (err, result) => {
            if (err) {
              return res.status(400).send({
                message: err,
              });
            }
            return res.status(200).send({
              user: result[0]
            });
        });
      } else {
        return res.status(400).send({
          message: err,
        });
      }
    }
  );
}

exports.updatePassword = (req, res) => {

  const { id, oldPassword, newPassword  } = req.body;

  bcrypt.hash(oldPassword, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({
        message: err,
      });
    } else {

      db.query(
        `SELECT * FROM users WHERE id = ?;`,
        [id],
        (err, result) => {
          if (err) {
            return res.status(400).send({
              message: err,
            });
          }

          bcrypt.compare(
            oldPassword,
            result[0]['password'],
            (bErr, bResult) => {
              if (bErr) {
                return res.status(400).send({
                  message: 'Old Password is incorrect!',
                });
              }
              if (bResult) {
                // password match

                bcrypt.hash(newPassword, 10, (err, hash) => {
                  if (err) {
                    return res.status(500).send({
                      message: err,
                    });
                  } else {
                    db.query(
                      `UPDATE users SET password = ? WHERE id = ?`,
                      [hash, id],
                      (err, result) => {
                        if (err) {
                          return res.status(400).send({
                            message: err,
                          });
                        }
                        return res.status(200).send({
                          message: "Password update successfully" 
                        });
                      }
                    );
                  }
                });
              } else {
                return res.status(400).send({
                  message: 'Old Password is incorrect!!!',
                });
              }
            }
          );
      });
    }
  });
}


exports.logout = (req, res) => {
  // res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};