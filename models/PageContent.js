const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageContentSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    fields: {
        type: String,
        required: true
    }

});

const PageContent = mongoose.model("PageContent", pageContentSchema);

module.exports = PageContent;