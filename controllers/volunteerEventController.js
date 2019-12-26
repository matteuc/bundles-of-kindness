const volunteerEventDb = require("../models/VolunteerEvent");

const { isVerified } = require("./apiAuth.js");

const forbiddenErr = {
    message: "API ACCESS FORBIDDEN - Invalid API key provided."
}

module.exports = {
    create: function(req, res) {
        if( isVerified(req.body.key) ) {
            volunteerEventDb
                .create(req.body)
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));

        } else {
            res.status(403).json(forbiddenErr)
        }
    },
    findAll: function(req, res) {
        volunteerEventDb
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
            
    }
    ,
    update: function(req, res) {
        if( isVerified(req.body.key) ) {
            volunteerEventDb
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

        } else {
            res.status(403).json(forbiddenErr)
        }
    }, 
    delete: function(req, res) {
        if( isVerified(req.body.key) ) {
            volunteerEventDb
            .findOne({ _id: req.params.id  })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

        } else {
            res.status(403).json(forbiddenErr)
        }
        
    }
}