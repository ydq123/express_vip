const express = require("express");
const router = express.Router();
const { querySql } = require("../db/index.js");
const Result = require("../utils/Result.js");

router.get("/userList", (req, res, next) => {
  res.json({
    name:"xixi"
  });
});

module.exports = router;
