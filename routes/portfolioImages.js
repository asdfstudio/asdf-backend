const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../common-middleware");
const { 
  createPortfolioImages 
} = require("../controllers/portfolioImages");
const router = express.Router();

router.post(
  "/portfolio/create/portfolioImages",
  // requireSignin,
  // adminMiddleware,
  upload.array('images'),
  createPortfolioImages
);

module.exports = router;
