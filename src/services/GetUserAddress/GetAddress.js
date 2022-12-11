import React, {useState} from 'react';
import {useFetchLocationName} from "./GeocodingAPI.js";

export const useAddress = () => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const getLatitudeLongitude = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                console.log('Unable to retrieve your location');
            });
        }
    }
    getLatitudeLongitude()

    return useFetchLocationName(lat, lng)
}