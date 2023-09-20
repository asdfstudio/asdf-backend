const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.js");

const userMiddleware = require('../middleware/users.js');

router.post('/signup', userMiddleware.validateRegister, authController.signUp)
router.post('/login', authController.login)
router.post('/logout', authController.logout);
router.post('/updateUser', authController.updateUser);
router.post('/updatePassword', authController.updatePassword);

router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {

  res.send('This is secret content!');
});

module.exports = router;
