const router = require("express").Router();
const dropzoneController = require("../../controllers/dropzoneController");

// Matches with "/api/dropzone"
router.route("/")
  .get(dropzoneController.findAll)
  .post(dropzoneController.create)

router.route("/:id")
  .delete(dropzoneController.delete)
  .put(dropzoneController.update)

module.exports = router;
