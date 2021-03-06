const dropzoneDb = require("../models/Dropzone");

const { isVerified } = require("./apiAuth.js");

const forbiddenErr = {
    message: "API ACCESS FORBIDDEN - Invalid API key provided."
}

module.exports = {
    create: function(req, res) {
        if( isVerified(req.query.key) ) {
            dropzoneDb
            .create(req.body.data)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
            
        } else {
            res.status(403).json(forbiddenErr)
        }
    },
    findAll: function(req, res) {
        dropzoneDb
        .find({})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
        
    }
    ,
    update: function(req, res) {
        if( isVerified(req.query.key) ) {
            dropzoneDb
            .findOneAndUpdate({ _id: req.params.id }, req.body.data)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
            
        } else {
            res.status(403).json(forbiddenErr)
        }
    }, 
    delete: function(req, res) {
        if( isVerified(req.query.key) ) {
            dropzoneDb
            .findOne({ _id: req.params.id  })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
            
        } else {
            res.status(403).json(forbiddenErr)
        }
        
    }
}