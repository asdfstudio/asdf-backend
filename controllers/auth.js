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
                      },
                      'SECRETKEY',
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
                  'INSERT INTO users (id, name, email, password, registered, last_login) VALUES (?, ?, ?, ?, now(), now());',
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

exports.logout = (req, res) => {
    res.cookie('userSave', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.status(200).redirect("/");
}

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.userSave) {
        try {
            // 1. Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.userSave,
                process.env.JWT_SECRET
            );
            console.log(decoded);

            // 2. Check if the user still exist
            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
                console.log(results);
                if (!results) {
                    return next();
                }
                req.user = results[0];
                return next();
            });
        } catch (err) {
            console.log(err)
            return next();
        }
    } else {
        next();
    }
}