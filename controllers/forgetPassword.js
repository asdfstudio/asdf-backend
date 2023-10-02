const db = require('../lib/db.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const createTestTransporter = require('../config/createTestTransporter.js');

function generateResetToken(email) {
  const secretKey = process.env.JWT_SECRET;
  const payload = {
    email: email,
  };
  const expiresIn = '1h';
  const resetToken = jwt.sign(payload, secretKey, { expiresIn });
  return resetToken;
}

async function sendResetEmail(email, token) {
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   host: 'smtp.gmail.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: process.env.EMAIL,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });

  const transporter = await createTestTransporter();

  const mailOptions = {
    from: 'tir120114@gmail.com',
    to: email,
    subject: 'Password Reset',
    html:
  '<p>Please click on the following link to verify your email address:</p>' +
  'http://localhost:3000/user/resetPassword?token=' +
  token,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } 
    else {
      console.log('Email sent:', info.response);
      console.log('Test email sent: Preview URL: ' + nodemailer.getTestMessageUrl(info));
    }
  });
}


exports.forgetPassword = (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).send({
        message: 'Please provide your email address.',
      });
    }

    db.query('SELECT * FROM users WHERE email = ?', 
    [email],(err, user) => {

    if (!user || user.length === 0) {
      return res.status(400).json({ message: 'No account found with this email' });
    }

    const resetToken = generateResetToken();

    const tokenExpiration = new Date();

    tokenExpiration.setHours(tokenExpiration.getHours() + 1);

    db.query('UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE email = ?', [
      resetToken,
      tokenExpiration,
      email,
    ]);

    sendResetEmail(email, resetToken);

    res.status(200).json({ message: 'Please, Check your email' });
    
  });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};



exports.resetPassword = (req, res) => {
  if (req.method === 'POST') {
    const token = req.body.token;
    const password = req.body.password;

    try {
      db.query(`SELECT * FROM users WHERE reset_token = ?;`, 
      [token],(err, user) => {

      if (!user || user.length === 0) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
      }
      
      bcrypt.hash(password, 10, (err, hash) => {
        db.query('UPDATE users SET password = ?, reset_token = NULL, reset_token_expiration = NULL WHERE id = ?', [
          hash,
          user[0].id,
        ]);
      });

      res.status(200).json({ message: 'Password reset successfully.' });
    }
    );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.status(405).end();
  }
};