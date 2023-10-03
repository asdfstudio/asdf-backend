const express = require("express");
const { visitors } = require("../controllers/visitors");
const router = express.Router();

router.get(
  "/visitor-count",
  visitors
);

module.exports = router;
