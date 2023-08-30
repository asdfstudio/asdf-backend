const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const db = require('../lib/db.js');

exports.login = async (req, res) => {
    try {
        db.query(
            `SELECT * FROM users WHERE email = ?;`,
            [req.body.email],
            (err, result) => {
              if (err) {
                return res.status(400).send({
                  message: err,
                });
              }
              if (!result.length) {
                return res.status(400).send({
                  message: 'email or password incorrect!',
                });
              }
        
              bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                  if (bErr) {
                    return res.status(400).send({
                      message: 'email or password incorrect!',
                    });
                  }
                  if (bResult) {
                    // password match
                    const token = jwt.sign(
                      {
                        email: result[0].email,
                        userId: result[0].id,
                        role: 'admin'
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
                    message: 'email or password incorrect!',
                  });
                }
              );
            }
          );
    } catch (err) {
        console.log(err);
    }
}
exports.signUp = (req, res) => {
    db.query(
        'SELECT id FROM users WHERE LOWER(email) = LOWER(?)',
        [req.body.email],
        (err, result) => {
          if (result && result.length) {
            // error
            return res.status(409).send({
              message: 'This email is already in use!',
            });
          } else {
            // email not in use
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).send({
                  message: err,
                });
              } else {
                db.query(
                  'INSERT INTO users (id, name, email, password, role, registered, last_login) VALUES (?, ?, ?, ?, DEFAULT, now(), now());',
                  [uuid.v4(), req.body.name, req.body.email, hash],
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
}

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