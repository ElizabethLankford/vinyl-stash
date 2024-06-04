const express = require("express");
const { route } = require("./users");
const router = express.Router();

router.get("/health", (req, res, next) => {
  res.send("OK");
});

router.use(express.json());
router.use("/vinyls", require("./vinyls"));
router.use("/users", require("./users"));

module.exports = router;
