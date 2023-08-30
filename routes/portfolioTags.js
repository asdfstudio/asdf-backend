const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../common-middleware");
const { 
  createPortfolioTags
} = require("../controllers/portfolioTags");
const router = express.Router();

router.post(
  "/portfolio/create/portfolioTags",
  // requireSignin,
  // adminMiddleware,
  createPortfolioTags
);

module.exports = router;
