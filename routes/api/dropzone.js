const router = require("express").Router();
const dropzoneController = require("../../controllers/dropzoneController");

// Matches with "/api/dropzone"
router.route("/")
  .get(dropzoneController.find)
  .post(dropzoneController.create)
//   .delete(dropzoneController.delete)
//   .put(dropzoneController.update)

module.exports = router;
