const router = require("express").Router();
const dropzoneRoutes = require("./dropzone");
const sponsorCompanyRoutes = require("./sponsorCompany");

// Dropzone routes
router.use("/dropzone", dropzoneRoutes);

// SponsorCompany routes
router.use("/sponsorCompany", sponsorCompanyRoutes);

module.exports = router;
