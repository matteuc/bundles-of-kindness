const dropzoneDb = require("../models/Dropzone");

module.exports = {
    create: function(req, res) {
        dropzoneDb
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    find: function(req, res) {
        dropzoneDb
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
    // ,
    // update: function(req, res) {
        
    //     dropzoneDb
    //     .findOneAndUpdate({ }, req.body)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // }, 
    // delete: function(req, res) {
    //     dropzoneDb
    //         .findOne({ })
    //         .then(dbModel => dbModel.remove())
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // }
}