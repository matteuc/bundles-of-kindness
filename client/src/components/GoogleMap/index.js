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

        locations.forEach(location => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(location.lat, location.lng),
                map: map,
                title: location.iw_title || '',
                icon: location.icon || ''
            });
            _createInfoWindow(marker, location);
            markers.push(marker);
        });

        return markers;
    };

    const _createInfoWindow = (marker, location) => {
        const { iw_title, iw_text, iw_imgUrl } = location;

        const infoWindowTemplate = `
      <div class="info-window" style="background-image: url(${iw_imgUrl})"}>
        <h4>${ iw_title}</h4>
        <p>${ iw_text}</p>
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
        if(props.locations.length) {
            map = _createMap();
            markers = _createMarkers();
            if (props.center) {
                _centerMap();
            }
        }

    });

    return (
        <div className="google-map" ref={mapCanvas} style={{ display: "flex" }}>
            <img style={{ margin: "auto" }} height="40px" src="https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif" alt="Loading Map..." />
        </div>
    );
}

export default GoogleMap;