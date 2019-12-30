const router = require("express").Router();
const volunteerEventController = require("../../controllers/volunteerEventController");

// Matches with "/api/volunteerEvent"
router.route("/")
  .get(volunteerEventController.findAll)
  .post(volunteerEventController.create)

router.route("/:id")
  .delete(volunteerEventController.delete)
  .put(volunteerEventController.update)

module.exports = router;
