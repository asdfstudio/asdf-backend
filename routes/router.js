const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.js");

const userMiddleware = require('../middleware/users.js');

// http://localhost:3000/api/sign-up
router.post('/signup', userMiddleware.validateRegister, authController.signUp)

// http://localhost:3000/api/login

router.post('/login', authController.login)

// http://localhost:3000/api/logout
router.post('/logout', authController.logout);

// http://localhost:3000/api/secret-route
router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is secret content!');
});

module.exports = router;
