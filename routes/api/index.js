const router = require("express").Router();
const dropzoneRoutes = require("./dropzone");
const sponsorCompanyRoutes = require("./sponsorCompany");
const volunteerEventRoutes = require("./volunteerEvent");
const adminRoutes = require("./admin");
const sendMail = require("../../nodemailer");


// Dropzone routes
router.use("/dropzone", dropzoneRoutes);

// SponsorCompany routes
router.use("/sponsorCompany", sponsorCompanyRoutes);

// VolunteeringEvent routes
router.use("/volunteerEvent", volunteerEventRoutes);

// Admin routes
router.use("/admin", adminRoutes);

// Nodemailer API route
router.post('/email', (req, res) => {
    sendMail(req.body.data.name, req.body.data.sender, req.body.data.message, 
        (err, info) => {
            if(err)
                res.json(err)
            else
                res.json(info);
        })
});

module.exports = router;
