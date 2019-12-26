const router = require("express").Router();
const adminController = require("../../controllers/adminController");

// Matches with "/api/admin"
router.route("/")
  .get(adminController.findAll)
  .post(adminController.create)

router.route("/:id")
  .delete(adminController.delete)
  .put(adminController.update)

module.exports = router;
