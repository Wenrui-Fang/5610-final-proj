import React, {useEffect, useState} from "react";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as authService from "../../services/auth-service";
import './index.css';
import {useParams} from "react-router";
import UserProfile from "./user-profile";
import AdminProfile from "./admin-profile";
import AnoyProfile from "./anoy-profile";
import BussinessProfile from "./business-profile";
import {SearchBar} from "../../SearchLandingScreen/SearchBar/SearchBar";

const Profile = () => {
    const {username} = useParams();
    const [profile, setProfile] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        try {
            //check if this profile is current login user's
            console.log(username);
            const getProfile = async () => await authService.profile().then(user => setCurrentUser(user));
            let p = getProfile();

            if (username !== currentUser.username) {
                const getUserByName = async () => await authService.findUser(username)
                    .then(user => {
                        setProfile(user);
                    });
                let user = getUserByName();
            } else {
                setProfile(currentUser);
            }

        } catch (e) {
            setCurrentUser(undefined);
            const getUserByName = async () => await authService.findUserBySingleName(username)
                .then(user => setProfile(user))
            let user = getUserByName();
            console.log(e);
            console.log(profile);
        }
    }, [username]);


    return (
        <>
            <SearchBar loggedIn={true} currentUser={currentUser}/>
            <div className="container">
                {
                    currentUser === undefined && <AnoyProfile profile={profile}/>
                }
                {
                    currentUser && currentUser.accountType === 'BUSSINESS' &&
                    <BussinessProfile profile={profile} currentUser={currentUser}/>
                }
                {
                    currentUser && currentUser.accountType === 'PERSONAL' &&
                    <UserProfile profile={profile} currentUser={currentUser} setProfile={setProfile}/>
                }
                {
                    currentUser && currentUser.accountType === 'ADMIN' &&
                    <AdminProfile profile={profile} currentUser={currentUser}/>
                }

            </div>
        </>


    );
}
export default Profile;