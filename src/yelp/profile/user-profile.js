import Collections from "./collections";
import Following from "./followings";
import Followers from "./followers";
import React from "react";
import {Link, Route, Routes, useNavigate,useLocation } from "react-router-dom";
import * as authService from "../../services/auth-service";
import * as followService from "../../services/follow-service";
import Reviews from "./myreviews";

const AdminProfile = ({profile,currentUser,setProfile}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        authService.logout()
            .then(() => navigate('/login'));
    }

    const refreshUser = async () => {
        let user = await authService.findUser(profile.username);
        setProfile(user);
    }

    const followUser = async () => {
        console.log(currentUser._id, profile._id);
        followService.userTogglesUserFollows(currentUser._id, profile._id)
            .then(refreshUser)
            .catch(e => alert(e));
    }


    return(
        <>
            <div className="wd-profile-header">
                <div className="wd-banner-photo"/>
                <img src={profile.profilePhoto===undefined?"https://pbs.twimg.com/profile_images/1599202909962412032/QbvIJjti_400x400.jpg":`${profile.profilePhoto}`} className="wd-profile-photo"/>
                <div className="float-end">
                    {
                        profile.username === currentUser.username
                        &&<div>
                            <Link to={`/profile/${profile.username}/edit`}
                                  className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
                                Edit profile
                            </Link>
                            <button type="button" onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill">
                                Logout
                            </button>
                        </div>

                    }
                    {
                        profile.username !== currentUser.username &&
                        <div>
                            <button onClick={followUser} className="mt-2 me-3 float-end btn btn-primary rounded-pill">
                                {
                                    profile.followedByMe ? 'Unfollow':'Follow'
                                }

                            </button>
                        </div>

                    }

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
                    <span className="me-3">Yelp Since {profile.joined===undefined&&<span>2022-12-7</span>}
                        {profile.joined!==undefined&&<span>{profile.joined.substring(0,10)}</span>}</span>
                </p>
                <Link to={`/profile/${profile.username}/followings` } className="text-decoration-none"><b>{profile.followings}</b> Following</Link>
                <Link to={`/profile/${profile.username}/followers`} className="text-decoration-none"><b className="ms-4">{profile.followers}</b> Followers</Link>
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
            <div>
                <ul className="mt-4 nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to={`/profile/${profile.username}/myreviews`}
                              className={`nav-link ${location.pathname.indexOf('myreviews') >= 0 ? 'active':''}`}>
                            Reviews</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/profile/${profile.username}/mycollects`}
                              className={`nav-link ${location.pathname.indexOf('mycollects') >= 0 ? 'active':''}`}>
                            Collections</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/profile/${profile.username}/followings`}
                              className={`nav-link ${location.pathname.indexOf('followings') >= 0 ? 'active':''}`}>
                            Followings</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/profile/${profile.username}/followers`}
                              className={`nav-link ${location.pathname.indexOf('followers') >= 0 ? 'active':''}`}>
                            Followers</Link>
                    </li>
                </ul>
            </div>
            <Routes>
                <Route path="/mycollects" element={<Collections userId={currentUser._id} profileId={profile._id}/>}/>
                <Route path="/followings" element={<Following username={profile.username}/>}/>
                <Route path="/followers" element={<Followers username={profile.username}/>}/>
                <Route path="/myreviews" element={<Reviews profileId={profile._id}/>}/>
            </Routes>
        </>
    )
}

export default AdminProfile;