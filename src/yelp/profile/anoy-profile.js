import Collections from "./collections";
import Following from "./followings";
import Followers from "./followers";
import React from "react";
import {Link, Route, Routes, useNavigate,useLocation } from "react-router-dom";
import * as authService from "../../services/auth-service";
import * as followService from "../../services/follow-service";
import Reviews from "./myreviews";

const AnoyProfile = ({profile}) => {

    const navigate = useNavigate();
    const location = useLocation();

    console.log(profile);

    return(
        <>
            <div className="wd-profile-header">
                <div className="wd-banner-photo"/>
                <img src={profile.profilePhoto===undefined||null?"https://pbs.twimg.com/profile_images/1599202909962412032/QbvIJjti_400x400.jpg":`${profile.profilePhoto}`} className="wd-profile-photo"/>
            </div>
            <div className="wd-profile-name">
                <h5 className="text-black mb-0"><b>{profile.firstName} {profile.lastName}</b></h5>
                <p className="pt-2">
                    <b>Things I Love</b><br/>
                    {
                        profile.thingsILove && <span>{profile.thingsILove}</span>
                    }
                    {
                        profile.thingsILove===undefined &&
                        <span>You haven't told us yet ... do tell!</span>
                    }
                </p>
            </div>

        </>
    )
}

export default AnoyProfile;