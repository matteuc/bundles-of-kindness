const adminDb = require("../models/Admin");

const { isVerified } = require("./apiAuth.js");

const forbiddenErr = {
    message: "API ACCESS FORBIDDEN - Invalid API key provided."
}

module.exports = {
    create: function(req, res) {
        if( isVerified(req.query.key) ) {
            adminDb
                .create(req.body.data)
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));

        } else {
            res.status(403).json(forbiddenErr)
        }
    },
    findAll: function(req, res) {
        if( isVerified(req.query.key) ) {
            adminDb
                .find({})
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));
        } else {
            res.status(403).json(forbiddenErr)
        }    
    }
    ,
    update: function(req, res) {
        if( isVerified(req.query.key) ) {
            adminDb
            .findOneAndUpdate({ _id: req.params.id }, req.body.data)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

        } else {
            res.status(403).json(forbiddenErr)
        }
    }, 
    delete: function(req, res) {
        if( isVerified(req.query.key) ) {
            adminDb
            .findOne({ _id: req.params.id  })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

        } else {
            res.status(403).json(forbiddenErr)
        }
        
    }
}