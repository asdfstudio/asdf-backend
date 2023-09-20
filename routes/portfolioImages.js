const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../common-middleware");
const { 
  createPortfolioImages, updatePortfolioImages 
} = require("../controllers/portfolioImages");
const router = express.Router();

router.post(
  "/portfolio/create/portfolioImages",
  requireSignin,
  adminMiddleware,
  upload.array('images'),
  createPortfolioImages
);

router.post(
  "/portfolio/update/portfolioImages",
  requireSignin,
  adminMiddleware,
  upload.array('images'),
  updatePortfolioImages
);

module.exports = router;
