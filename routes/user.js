const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  upload,
  superAdminMiddleware,
} = require("../common-middleware");
const {   
  getUsers, 
  deleteUserById, 
  promoteToAdmin
} = require("../controllers/user");
const router = express.Router();

router.get(
  "/user/getUsers",
  requireSignin,
  adminMiddleware,
  getUsers
);
router.delete(
  "/user/deleteUserById",
  requireSignin,
  adminMiddleware,
  deleteUserById
);

router.post(
  "/user/promoteToAdmin",
  requireSignin,
  superAdminMiddleware,
  promoteToAdmin
);

module.exports = router;
