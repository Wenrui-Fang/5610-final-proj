import React, {useEffect, useState} from "react";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as authService from "../../services/auth-service";
import './index.css';
import {useParams} from "react-router";
import UserProfile from "./user-profile";
import AdminProfile from "./admin-profile";

const Profile = () => {
    const {username} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState({});
    const [currentUser,setCurrentUser] = useState({});
    useEffect(() => {
        try {
            //check if this profile is current login user's
            console.log(username);
            const getProfile = async() => await authService.profile()
                .then(user => setCurrentUser(user));
            let user = getProfile();
            if(username!==user.username){
                const getUserByName = async() => await authService.findUser(username)
                    .then(user => {
                        setProfile(user);
                    });
                user = getUserByName();
            }else{
                const getUserByName = async() => await authService.findUser(username)
                    .then(user => {
                        setCurrentUser(user);
                        setProfile(user);
                    });
                user = getUserByName();
            }
        } catch (e) {
            navigate('/login');
        }
    }, [username]);


    return(
        <div className="container">
            {
                currentUser.accountType==='PERSONAL' &&
                <UserProfile profile={profile} currentUser={currentUser} setProfile={setProfile}/>
            }
            {
                currentUser.accountType==='ADMIN' &&
                <AdminProfile profile={profile} currentUser={currentUser}/>
            }

        </div>


    );
}
export default Profile;