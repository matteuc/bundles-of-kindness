const sponsorCompanyDb = require("../models/SponsorCompany");

module.exports = {
    create: function(req, res) {
        sponsorCompanyDb
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    find: function (req, res) {
        sponsorCompanyDb
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
    // ,
    // update: function(req, res) {

    //     sponsorCompanyDb
    //     .findOneAndUpdate({ }, req.body)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // }, 
    // delete: function(req, res) {
    //     sponsorCompanyDb
    //         .findOne({ })
    //         .then(dbModel => dbModel.remove())
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // }
}