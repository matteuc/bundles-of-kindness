const router = require("express").Router();
const sponsorCompanyController = require("../../controllers/sponsorCompanyController");

// Matches with "/api/sponsorCompany"
router.route("/")
  .get(sponsorCompanyController.findAll)
  .post(sponsorCompanyController.create)

router.route("/:id")
  .delete(sponsorCompanyController.delete)
  .put(sponsorCompanyController.update)

module.exports = router;
