const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  upload,
  setVisitors,
} = require("../common-middleware");
const {
  createPortfolio,
  getPortfolios,
  deletePortfolioById,
  updateSortingPortfolio,
  updatePortfolio,
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
  "/portfolio/update",
  requireSignin,
  adminMiddleware,
  upload.single('coverImageUpdate'),
  updatePortfolio
);
router.post(
  "/portfolio/updateSorting",
  requireSignin,
  adminMiddleware,
  updateSortingPortfolio
);
router.get(
  "/admin/portfolio/getPortfolios",
  getPortfolios
);
router.get(
  "/portfolio/getPortfolios",
  setVisitors,
  getPortfolios
);
router.delete(
  "/portfolio/deletePortfolioById",
  requireSignin,
  adminMiddleware,
  deletePortfolioById
);

module.exports = router;
