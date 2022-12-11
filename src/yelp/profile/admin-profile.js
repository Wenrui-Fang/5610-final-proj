import Following from "./followings";
import Followers from "./followers";
import React from "react";
import {Link, Route, Routes, useNavigate,useLocation } from "react-router-dom";
import * as authService from "../../services/auth-service";
import * as followService from "../../services/follow-service";

const UserProfile = ({profile,currentUser}) => {

    const navigate = useNavigate();
    const logout = () => {
        authService.logout()
            .then(() => navigate('/login'));
    }

    return(
        <>
            <div className="wd-profile-header">
                <div className="wd-banner-photo"/>
                <img src={profile.profilePhoto===undefined?"https://pbs.twimg.com/profile_images/1599202909962412032/QbvIJjti_400x400.jpg":`${profile.profilePhoto}`}  className="wd-profile-photo"/>
                <div className="float-end">

                    <div>
                        <Link to={`/profile/${profile.username}/edit`}
                              className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
                            Edit profile
                        </Link>
                        {
                            profile.username === currentUser.username&&
                             <button type="button" onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill">
                                Logout
                            </button>}
                        </div>


                </div>
            </div>
            <div className="wd-profile-name">
                <h5 className="text-black mb-0"><b>{profile.firstName} {profile.lastName}</b></h5>
                <p>
                    <i className="bi bi-geo me-1"/>
                    <span className="me-3">Seattle, WA</span>
                    <i className="bi bi-balloon-heart me-1"/>
                    <span className="me-3">Born {profile.dateOfBirth===undefined&&<span>1958-10-1</span>}
                        {profile.dateOfBirth!==undefined&&<span>{profile.dateOfBirth.substring(0,10)}</span>}</span>
                    <i className="bi bi-yelp me-1"/>
                    <span className="me-3">{profile.username === currentUser.username&& "Work at "}Yelp Since {profile.joined===undefined&&<span>2022-12-7</span>}
                        {profile.joined!==undefined&&<span>{profile.joined.substring(0,10)}</span>}</span>
                </p>
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

export default UserProfile;