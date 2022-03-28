const { apiController } = require("../controllers");
const Router = require("express").Router;
const router = new Router();

router.get("/whitelist/:address", apiController.getWhitelist);

router.get("/whitelist", apiController.getWhitelistRoot);

router.get("/whitelist-count", apiController.getWhitelistCount);

module.exports = router;
