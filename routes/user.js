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

router.post(
  "/user/promoteToAdmin",
  requireSignin,
  adminMiddleware,
  promoteToAdmin
);

router.post(
  "/user/promoteToSuperAdmin",
  requireSignin,
  superAdminMiddleware,
  promoteToAdmin
);

router.delete(
  "/user/deleteUserById",
  requireSignin,
  adminMiddleware,
  deleteUserById
);

module.exports = router;
