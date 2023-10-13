const express = require("express");
const { 
  visitors, 
  setPortfoliovisitors, 
  portfolioVisitors, 
  exitPortfoliovisitors, 
  portfolioTimeSpent,
  getTopPortfolios
} = require("../controllers/visitors");
const router = express.Router();

router.get(
  "/visitor-count",
  visitors
);

router.get(
  "/portfolio/portfolio-visitor-count",
  portfolioVisitors
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

router.get(
  "/portfolio/portfolio-time-spent",
  portfolioTimeSpent
);

module.exports = router;
