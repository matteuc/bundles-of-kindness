import axios from "axios";
require("dotenv").config();

export default {
  geocodeLocation: function(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
  },
  getAlbumPhotos: function(albumId) {
    return axios.get(`/api/galbum?id=${albumId}`)
  },
  getSponsorCompanies: function () {
    return axios.get(`/api/sponsorCompany`);
  },
  getDropzones: function () {
    return axios.get(`/api/dropzone`);
  },
  getAdmin: function () {
    return axios.get(`/api/admin?key=${process.env.REACT_APP_API_SECRET}`);
  },
  getVolunteerEvents: function () {
    return axios.get(`/api/volunteerEvent`);
  },
  getPage: function (pageId) {
    return axios.get(`/api/pageContent/${pageId}`);
  },
  getPages: function () {
    return axios.get(`/api/pageContent`);
  },
  sendMail: function(name, sender, message) {
    return axios.post(`/api/email`, { data: { name, sender, message } })
  },
  addSponsorCompany: function (newSponsor) {
    return axios.post(`/api/sponsorCompany?key=${process.env.REACT_APP_API_SECRET}`, { data: newSponsor });
  },
  addDropzone: function (newDropzone) {      
    return axios.post(`/api/dropzone?key=${process.env.REACT_APP_API_SECRET}`,  { data: newDropzone });
  },
  addAdmin: function (newAdmin) {
    return axios.post(`/api/admin?key=${process.env.REACT_APP_API_SECRET}`,  { data: newAdmin });
  },
  addVolunteerEvent: function (newVolunteerEvent) {
    return axios.post(`/api/volunteerEvent?key=${process.env.REACT_APP_API_SECRET}`,  { data: newVolunteerEvent });
  },
  updateSponsorCompany: function (newSponsor, sponsorCompanyId) {
    return axios.put(`/api/sponsorCompany/${sponsorCompanyId}?key=${process.env.REACT_APP_API_SECRET}`, { data: newSponsor });
  },
  updateDropzone: function (newDropzone, dropzoneId) {
    return axios.put(`/api/dropzone/${dropzoneId}?key=${process.env.REACT_APP_API_SECRET}`,  { data: newDropzone });
  },
  updateAdmin: function (newAdmin, adminId) {
    return axios.put(`/api/admin/${adminId}?key=${process.env.REACT_APP_API_SECRET}`,  { data: newAdmin });
  },
  updatePage: function (newPage, pageId) {
    return axios.put(`/api/pageContent/${pageId}?key=${process.env.REACT_APP_API_SECRET}`,  { data: newPage });
  },
  updateVolunteerEvent: function (newVolunteerEvent, volunteerEventId) {
    return axios.put(`/api/volunteerEvent/${volunteerEventId}?key=${process.env.REACT_APP_API_SECRET}`,  { data: newVolunteerEvent });
  },
  deleteSponsorCompany: function (sponsorCompanyId) {
    return axios.delete(`/api/sponsorCompany/${sponsorCompanyId}?key=${process.env.REACT_APP_API_SECRET}`);
  },
  deleteDropzone: function (dropzoneId) {
    return axios.delete(`/api/dropzone/${dropzoneId}?key=${process.env.REACT_APP_API_SECRET}`);
  },
  deleteAdmin: function (adminId) {
    return axios.delete(`/api/admin/${adminId}?key=${process.env.REACT_APP_API_SECRET}`);
  },
  deleteVolunteerEvent: function (volunteerEventId) {
    return axios.delete(`/api/volunteerEvent/${volunteerEventId}?key=${process.env.REACT_APP_API_SECRET}`);
  },
};