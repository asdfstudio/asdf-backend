const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../common-middleware");
const {
  createPortfolio,
  getProductDetailsById,
  getPortfolios,
  getAllProducts,
  updateQuantity,
  deletePortfolioById,
} = require("../controllers/portfolio");
const router = express.Router();

router.post(
  "/portfolio/create",
  requireSignin,
  adminMiddleware,
  upload.single('coverImage'),
  createPortfolio
);
router.get(
  "/portfolio/getPortfolios",
  requireSignin,
  adminMiddleware,
  getPortfolios
);
router.delete(
  "/portfolio/deleteProductById/:id",
  requireSignin,
  adminMiddleware,
  deletePortfolioById
);


router.post("/AllProducts", getAllProducts);
router.get("/product/:productId", getProductDetailsById);
router.post(
  "/updateQuantity",
  requireSignin,
  updateQuantity
);

module.exports = router;
