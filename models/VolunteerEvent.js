const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerEventSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

});

const VolunteerEvent = mongoose.model("VolunteerEvent", volunteerEventSchema);

module.exports = VolunteerEvent;