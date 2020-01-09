const router = require("express").Router();
const pageContentController = require("../../controllers/pageContentController");

// Matches with "/api/admin"
router.route("/")
  .get(pageContentController.findAll)

router.route("/:id")
  .get(pageContentController.findOne)
  .put(pageContentController.update)

module.exports = router;
