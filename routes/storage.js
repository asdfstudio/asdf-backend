const express = require("express");
const { storage } = require("../controllers/storage");
const router = express.Router();

router.get(
  "/portfolio/images/:fileName",
  storage
);

module.exports = router;
