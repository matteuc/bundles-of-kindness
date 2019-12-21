const router = require("express").Router();
const sponsorCompanyController = require("../../controllers/sponsorCompanyController");

// Matches with "/api/"
router.route("/")
  .get(sponsorCompanyController.find)
  .post(sponsorCompanyController.create)
  // .delete(sponsorCompanyController.delete)
  // .put(sponsorCompanyController.update)

module.exports = router;
