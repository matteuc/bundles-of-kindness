const router = require("express").Router();
const dropzoneRoutes = require("./dropzone");
const sponsorCompanyRoutes = require("./sponsorCompany");
const volunteerEventRoutes = require("./volunteerEvent");
const adminRoutes = require("./admin");


// Dropzone routes
router.use("/dropzone", dropzoneRoutes);

// SponsorCompany routes
router.use("/sponsorCompany", sponsorCompanyRoutes);

// VolunteeringEvent routes
router.use("/volunteerEvent", volunteerEventRoutes);

// Admin routes
router.use("/admin", adminRoutes);


module.exports = router;
