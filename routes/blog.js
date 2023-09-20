const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../common-middleware");
const { 
  createBlog, 
  updateBlog, 
  getBlogs, 
  deleteBlogById 
} = require("../controllers/blog");
const router = express.Router();

router.post(
  "/blog/create",
  requireSignin,
  adminMiddleware,
  upload.single('coverImage'),
  createBlog
);
router.post(
  "/blog/update",
  requireSignin,
  adminMiddleware,
  upload.single('coverImageUpdate'),
  updateBlog
);
router.get(
  "/blog/getBlogs",
  requireSignin,
  adminMiddleware,
  getBlogs
);
router.delete(
  "/blog/deleteBlogById",
  requireSignin,
  adminMiddleware,
  deleteBlogById
);

module.exports = router;
