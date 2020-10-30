const axios = require("axios");

module.exports = {
    getAlbumItems: function(req, res) {
        const albumId = req.query.id;

        const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g;

        function extractPhotos(content) {
            const links = new Set();
            let match;
            while ((match = regex.exec(content))) {
            links.add(match[1]);
            }
            return Array.from(links);
        }
            
        axios.get(`https://photos.app.goo.gl/${albumId}`).then((response) => {
            
            res.json(extractPhotos(response.data));
        });

    }
}