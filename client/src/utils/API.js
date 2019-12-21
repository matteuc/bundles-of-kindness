import axios from "axios";

export default {
  getSponsorCompanies: function () {
    return axios.get(`/api/sponsorCompany`);
  },
  getDropzones: function () {
    return axios.get(`/api/dropzone`);
  },
  addSponsorCompany: function (newSponsor) {
    return axios.post(`/api/sponsorCompany`, newSponsor);
  },
  addDropzone: function (newDropzone) {
    return axios.post(`/api/dropzone`, newDropzone);
  },
};