const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.js");

const userMiddleware = require('../middleware/users.js');

// http://localhost:3000/api/

router.post('/signup', userMiddleware.validateRegister, authController.signUp)
router.post('/login', authController.login)
router.post('/logout', authController.logout);

router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is secret content!');
});

module.exports = router;
