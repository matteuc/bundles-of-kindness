const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerEventSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String
    }

});

const VolunteerEvent = mongoose.model("VolunteerEvent", volunteerEventSchema);

module.exports = VolunteerEvent;