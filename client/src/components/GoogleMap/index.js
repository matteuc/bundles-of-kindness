// const { Component, PropTypes } = React;
import React, { useEffect } from "react";
import "./main.css";

const google = window.google;

const GoogleMap = (props) => {

    let mapCanvas = React.createRef();
    let map = null;
    let markers = null;

    const _createMap = () => {
        const { options, type } = props;

        if (type === 'street') {
            return new google.maps.StreetViewPanorama(mapCanvas.current, options);
        }

        return new google.maps.Map(mapCanvas.current, options);
    };

    const _createMarkers = () => {
        const { locations } = props;
        let markers = [];

        // if (config.allowClusters) {
        //     const markers = config.locations.map(location => {
        //         const marker = new google.maps.Marker({ position: location });
        //         _createInfoWindow(marker, location);
        //         return marker;
        //     });

        //     // const markerCluster = new google.maps.MarkerClusterer(
        //     //     map,
        //     //     markers,
        //     //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
        //     // );
        // } else {
        locations.forEach(location => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(location.lat, location.lng),
                map: map,
                title: location.infoWindowContent.title || '',
                icon: location.icon || ''
            });
            _createInfoWindow(marker, location);
            markers.push(marker);
        });
        // }

        return markers;
    };

    const _createInfoWindow = (marker, location) => {
        const { title, text, imgUrl } = location.infoWindowContent;

        const infoWindowTemplate = `
      <div class="info-window" style="background-image: url(${imgUrl})"}>
        <h4>${ title}</h4>
        <p>${ text}</p>
      </div>
    `;

        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowTemplate
        });

        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
    };

    const _centerMap = () => {
        let bounds = new google.maps.LatLngBounds();
        for (let marker of markers) {
            bounds.extend(marker.getPosition());
        }

        //center the map to the geometric center of all markers
        map.setCenter(bounds.getCenter());

        map.fitBounds(bounds);
    };

    useEffect(() => {
        map = _createMap();
        markers = _createMarkers();

        if (props.center) {
            _centerMap();
        }
    });

    return (
        <div className="google-map" ref={mapCanvas} style={{ display: "flex" }}>
            <img style={{ margin: "auto" }} height="40px" src="https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif" alt="Loading Map..." />
        </div>
    );
}

export default GoogleMap;