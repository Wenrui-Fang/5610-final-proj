import React, {useEffect, useState} from "react";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/auth-service"

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    useEffect(() => {
        try {
            const getProfile = async() => await service.profile()
                                            .then(user => setProfile(user));
            const user = getProfile();
        } catch (e) {
            navigate('/login');
        }
    }, []);

    const logout = () => {
        service.logout()
            .then(() => navigate('/login'));
    }

    return(
        <div>
            <div>
            Welcome {profile.username}
            </div>
            <button onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill">
                Logout
            </button>

        </div>


    );
}
export default Profile;