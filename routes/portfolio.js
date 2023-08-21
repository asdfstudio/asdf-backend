const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  upload
} = require("../common-middleware");
const {
  createProduct,
  getProductDetailsById,
  deleteProductById,
  getProducts,
  getAllProducts,
  updateQuantity,
} = require("../controllers/portfolio");
// const multer = require("multer");
const router = express.Router();
// const shortid = require("shortid");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + "-" + file.originalname);
//   },
// });

// const uploadmulter = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
//   adminMiddleware,
//   upload.array("productPicture"),
  createProduct
);
router.get("/product/:productId", getProductDetailsById);
router.post("/AllProducts", getAllProducts);
router.delete(
  "/product/deleteProductById",
  requireSignin,
  adminMiddleware,
  deleteProductById
);
router.post(
  "/product/getProducts",
  requireSignin,
  adminMiddleware,
  getProducts
);
router.post(
  "/updateQuantity",
  requireSignin,
  updateQuantity
);

module.exports = router;
