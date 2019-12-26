import axios from "axios";

export default {
  getSponsorCompanies: function () {
    return axios.get(`/api/sponsorCompany`);
  },
  getDropzones: function () {
    return axios.get(`/api/dropzone`);
  },
  getAdmin: function (API_SECRET) {
    return axios.get(`/api/admin`, { data: {key: API_SECRET} });
  },
  getVolunteerEvents: function () {
    return axios.get(`/api/volunteerEvent`);
  },
  addSponsorCompany: function (newSponsor, API_SECRET) {
    return axios.post(`/api/sponsorCompany`, { data: newSponsor, key: API_SECRET });
  },
  addDropzone: function (newDropzone, API_SECRET) {
    return axios.post(`/api/dropzone`,  { data: newDropzone, key: API_SECRET });
  },
  addAdmin: function (newAdmin, API_SECRET) {
    return axios.post(`/api/admin`,  { data: newAdmin, key: API_SECRET });
  },
  addVolunteerEvent: function (newVolunteerEvent, API_SECRET) {
    return axios.post(`/api/volunteerEvent`,  { data: newVolunteerEvent, key: API_SECRET });
  },
  deleteSponsorCompany: function (sponsorCompanyId, API_SECRET) {
    return axios.delete(`/api/sponsorCompany/${sponsorCompanyId}`, { data: { key: API_SECRET }  });
  },
  deleteDropzone: function (dropzoneId, API_SECRET) {
    return axios.delete(`/api/dropzone/${dropzoneId}`, { data: { key: API_SECRET }  });
  },
  deleteAdmin: function (adminId, API_SECRET) {
    return axios.delete(`/api/admin/${adminId}`, { data: { key: API_SECRET }  });
  },
  deleteVolunteerEvent: function (volunteerEventId, API_SECRET) {
    return axios.delete(`/api/volunteerEvent/${volunteerEventId}`, { data: { key: API_SECRET }  });
  },
};