const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dropzoneSchema = new Schema({
    lat: {
        type: Number,
        default: 0,
        required: true
    },
    lng: {
        type: Number,
        default: 0,
        required: true
    },
    iw_title: {
        type: String,
        default: "",
    },
    iw_text: {
        type: String,
        default: "",
    },
    iw_imgUrl: {
        type: String,
        default: "",
    },
    icon: {
        type: String,
        default: ""
    }

});

const Dropzone = mongoose.model("Dropzone", dropzoneSchema);

module.exports = Dropzone;