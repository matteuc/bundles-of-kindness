const pageContentDb = require("../models/PageContent");

const { isVerified } = require("./apiAuth.js");

const forbiddenErr = {
    message: "API ACCESS FORBIDDEN - Invalid API key provided."
}

module.exports = {
    findOne: function(req, res) {
        pageContentDb
            .find({_id: req.params.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
            
    },
    findAll: function(req, res) {
        pageContentDb
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
            
    }
    ,
    update: function(req, res) {
        if( isVerified(req.query.key) ) {
            pageContentDb
            .findOneAndUpdate({ _id: req.params.id }, req.body.data)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

        } else {
            res.status(403).json(forbiddenErr)
        }
    } 
    
}