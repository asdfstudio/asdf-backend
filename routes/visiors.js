const express = require("express");
const { 
  visitors, 
  setPortfoliovisitors, 
  exitPortfoliovisitors, 
  getTopPortfolios
} = require("../controllers/visitors");
const router = express.Router();

router.get(
  "/visitor-count",
  visitors
);
router.get(
  "/portfolio/Top-portfolios",
  getTopPortfolios
);

router.post(
  "/portfolio/portfolio-visit",
  setPortfoliovisitors
);

router.post(
  "/portfolio/portfolio-exit",
  exitPortfoliovisitors
);

module.exports = router;
