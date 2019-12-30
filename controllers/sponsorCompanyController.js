const sponsorCompanyDb = require("../models/SponsorCompany");

const { isVerified } = require("./apiAuth.js");

const forbiddenErr = {
    message: "API ACCESS FORBIDDEN - Invalid API key provided."
}

module.exports = {
    create: function(req, res) {
        if( isVerified(req.query.key) ) {
            sponsorCompanyDb
                .create(req.body)
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));

        } else {
            res.status(403).json(forbiddenErr)
        }
    },
    findAll: function(req, res) {
        sponsorCompanyDb
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
            
    }
    ,
    update: function(req, res) {
        if( isVerified(req.query.key) ) {
            sponsorCompanyDb
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

        } else {
            res.status(403).json(forbiddenErr)
        }
    }, 
    delete: function(req, res) {
        if( isVerified(req.query.key) ) {
            sponsorCompanyDb
            .findOne({ _id: req.params.id  })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

        } else {
            res.status(403).json(forbiddenErr)
        }
        
    }
}