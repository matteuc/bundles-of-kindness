const router = require("express").Router();
const galbumController = require("../../controllers/galbumController");

// Matches with "/api/galbum"
router.route("/")
  .get(galbumController.getAlbumItems)

module.exports = router;
