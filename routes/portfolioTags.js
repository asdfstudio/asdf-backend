const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../common-middleware");
const { 
  createPortfolioTags, updatePortfolioTags
} = require("../controllers/portfolioTags");
const router = express.Router();

router.post(
  "/portfolio/create/portfolioTags",
  // requireSignin,
  // adminMiddleware,
  createPortfolioTags
);
router.post(
  "/portfolio/update/portfolioTags",
  // requireSignin,
  // adminMiddleware,
  updatePortfolioTags
);

module.exports = router;
