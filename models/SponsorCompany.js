const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sponsorCompanySchema = new Schema({
    src: {
        type: String,
        default: "",
        required: true
      },
      name: {
        type: String,
        default: "",
        required: true
      }
});

const SponsorCompany = mongoose.model("SponsorCompany", sponsorCompanySchema);

module.exports = SponsorCompany;