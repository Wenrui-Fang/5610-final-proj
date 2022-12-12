import React, {useEffect, useState} from "react";
import "./home.css"
import { SearchBar } from "../SearchLandingScreen/SearchBar/SearchBar";
import HomePostsList from "../HomePostsList";
import * as authService from "../services/auth-service.js"
import * as api from "../services/officialyelp/yelp-api.js"
import {useAddress} from "../services/GetUserAddress/GetAddress.js";

const HomeComponent = () => {
    let loggedIn = false
    const [addressData, setAddressData] = useState("")
    const [businessesData, setBusinessesData] = useState({})
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        try {
            const getProfile = async () => await authService.profile().then(user => setCurrentUser(user));
            let user = getProfile();
        } catch (e) {
            setCurrentUser(undefined);
        }
    }, [])
    // console.log(currentUser)
    loggedIn = currentUser.username !== undefined;

    // https://developer.mapquest.com/documentation/geocoding-api/reverse/get
    // Get user's current location and get restaurants near the address
    try {
        const useAddressData = async () => await useAddress()
            .then(data => {
                data === null ? setAddressData("") : setAddressData(data)
            });
        let address = useAddressData()
    } catch (e) {
        setAddressData("");
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
            <SearchBar loggedIn={loggedIn} currentUser={currentUser}/>
            <div className="wd-home_banner2 position-relative"></div>
            <HomePostsList loggedIn={loggedIn} businessesData={businessesData}/>
        </>
    );
};
export default HomeComponent;
