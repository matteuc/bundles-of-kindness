const router = require("express").Router();
const dropzoneRoutes = require("./dropzone");
const sponsorCompanyRoutes = require("./sponsorCompany");
const volunteerEventRoutes = require("./volunteerEvent");
const adminRoutes = require("./admin");
const galbumRoutes = require("./galbum");
const pageContentRoutes = require("./pageContent");

const sendMail = require("../../nodemailer");


// Dropzone routes
router.use("/dropzone", dropzoneRoutes);

// SponsorCompany routes
router.use("/sponsorCompany", sponsorCompanyRoutes);

// VolunteeringEvent routes
router.use("/volunteerEvent", volunteerEventRoutes);

// Admin routes
router.use("/admin", adminRoutes);

// Google Photo routes
router.use("/galbum", galbumRoutes);

// PageContent routes
router.use("/pageContent", pageContentRoutes);

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
