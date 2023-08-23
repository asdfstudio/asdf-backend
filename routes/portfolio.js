const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../common-middleware");
const {
  createPortfolio,
  getProductDetailsById,
  deleteProductById,
  getProducts,
  getAllProducts,
  updateQuantity,
  createPortfolioImages,
} = require("../controllers/portfolio");
const router = express.Router();

router.post(
  "/portfolio/create",
  requireSignin,
  adminMiddleware,
  upload.single('coverImage'),
  createPortfolio
);
router.post(
  "/portfolio/create/portfolioImages",
  requireSignin,
  adminMiddleware,
  upload.array('images'),
  createPortfolioImages
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
