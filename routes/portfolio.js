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
  updateSortingPortfolio,
  updatePortfolio,
} = require("../controllers/portfolio");
const router = express.Router();

router.post(
  "/portfolio/create",
  // requireSignin,
  // adminMiddleware,
  upload.single('coverImage'),
  createPortfolio
);
router.post(
  "/portfolio/update",
  // requireSignin,
  // adminMiddleware,
  upload.single('coverImageUpdate'),
  updatePortfolio
);
router.post(
  "/portfolio/updateSorting",
  // requireSignin,
  // adminMiddleware,
  updateSortingPortfolio
);
router.get(
  "/portfolio/getPortfolios",
  // requireSignin,
  // adminMiddleware,
  getPortfolios
);
router.delete(
  "/portfolio/deletePortfolioById",
  // requireSignin,
  // adminMiddleware,
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
