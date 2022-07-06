const router = require("express").Router();

const apiRoute = require("./apiRoutes");
const homeRoutes = require("./home-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoute);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
