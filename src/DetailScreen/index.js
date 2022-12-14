import React, {useEffect, useState} from "react";
import * as authService from "../services/auth-service";
import {SearchBar} from "../SearchLandingScreen/SearchBar/SearchBar";
import DetailComponent from "./DetailComponent";
import {useNavigate} from "react-router-dom";

const DetailScreenComponent = () => {
    const navigate = useNavigate();
    let loggedIn = false
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        try {
            const getProfile = async () => await authService.profile().then(user => setCurrentUser(user));
            let user = getProfile();
        } catch (e) {
            setCurrentUser(undefined);
            navigate('/login');
        }
    }, [])

    loggedIn = currentUser.username !== undefined;
    console.log(currentUser)

    return (
        <>
            <SearchBar loggedIn={loggedIn} currentUser={currentUser} />
            <DetailComponent />
        </>
    );
}

export default DetailScreenComponent;