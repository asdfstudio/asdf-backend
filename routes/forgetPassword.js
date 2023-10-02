const express = require("express");
const router = express.Router();
const { 
  forgetPassword, 
  resetPassword
 } = require("../controllers/forgetPassword");

router.post(
  "/user/forgot-password",
  forgetPassword
);

router.post(
  "/user/reset-password",
  resetPassword
);

module.exports = router;
