const path = require("path");
const router = require("express").Router();

router.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/login.html"));
});

router.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/user.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;
