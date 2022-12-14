import Collections from "./collections";
import Following from "./followings";
import Followers from "./followers";
import React, {useEffect} from "react";
import {Link, Route, Routes, useNavigate,useLocation } from "react-router-dom";
import * as authService from "../../services/auth-service";
import BussinessReviews from "./mybusiness-review";

const BussinessProfile = ({profile,currentUser}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        authService.logout()
            .then(() => navigate('/login'));
    }

    return(
        <>
            <h2>Business</h2>
            <div className="wd-profile-header">
                <div className="wd-banner-photo"/>
                <img src={profile.profilePhoto===undefined?"https://pbs.twimg.com/profile_images/1599202909962412032/QbvIJjti_400x400.jpg":`${profile.profilePhoto}`} className="wd-profile-photo"/>
            </div>
            <div className="wd-profile-name">
                <h5 className="text-black mb-0"><b>{profile.firstName} {profile.lastName}</b></h5>
                <p>{profile.bussinessId}</p>
            </div>
            <div className="float-end">
                {
                    profile.username === currentUser.username
                    &&<div>
                        <button type="button" onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill">
                            Logout
                        </button>
                    </div>
                }

            </div>
            <div>
                <ul className="mt-4 nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to={`/profile/${profile.username}/mybussinessreviews`}
                              className={`nav-link ${location.pathname.indexOf('myreviews') >= 0 ? 'active':''}`}>
                            Reviews</Link>
                    </li>

                </ul>
            </div>
            <Routes>
                <Route path="/mybussinessreviews" element={<BussinessReviews profileId={profile.bussinessId}/>}/>
            </Routes>
        </>
    )
}

export default BussinessProfile;