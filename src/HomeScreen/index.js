import React, {useEffect, useState} from "react";
import "./home.css"
import { SearchBar } from "../SearchLandingScreen/SearchBar/SearchBar";
import HomePostsList from "../HomePostsList";
import * as api from "../services/officialyelp/yelp-api.js"
import {useAddress} from "../services/GetUserAddress/GetAddress.js";

const HomeComponent = () => {
    const [addressData, setAddressData] = useState("Boston")
    const [businessesData, setBusinessesData] = useState({})

    // https://developer.mapquest.com/documentation/geocoding-api/reverse/get
    // Get user's current location and get restaurants near the address
    try {
        const useAddressData = async () => await useAddress()
            .then(data => {
                data === null ? setAddressData("Boston") : setAddressData(data)
            });
        let address = useAddressData()
    } catch (e) {
        setAddressData("Boston");
    }

    console.log(addressData)
    useEffect(() => {
        try {
            const fetchData = async () => await api.findBusinesses(['', addressData])
                .then(data => setBusinessesData(data.businesses))
            let business = fetchData();
        } catch (e) {
            console.log("fetch business data fail!")
        }
    }, [addressData])

    return (
        <>
            <SearchBar/>
            <HomePostsList businessesData={businessesData}/>
        </>
    );
};
export default HomeComponent;
