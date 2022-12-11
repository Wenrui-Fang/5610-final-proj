import React, {useEffect, useState} from "react";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/auth-service"
import './index.css';
import {useParams} from "react-router";

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
            const getProfile = async() => await service.profile()
                                            .then(user => setCurrentUser(user));
            let user = getProfile();
            if(username!==user.username){
                const getUserByName = async() => await service.findUser(username)
                    .then(user => {
                        setProfile(user);
                    });
                user = getUserByName();
            }else{
                const getUserByName = async() => await service.findUser(username)
                    .then(user => {
                        setCurrentUser(user);
                        setProfile(user);
                    });
                user = getUserByName();
            }
        } catch (e) {
            navigate('/login');
        }
    }, []);

    const logout = () => {
        service.logout()
            .then(() => navigate('/login'));
    }

    const refreshUser = async () => {
        let user = await service.findUser(username);
        setProfile(user);
    }


    return(
        <>
            <div className="wd-profile-header">
                <div className="wd-banner-photo"/>
                <img src="https://pbs.twimg.com/profile_images/1599202909962412032/QbvIJjti_400x400.jpg" className="wd-profile-photo"/>
                <div className="float-end">
                    <Link to={`/profile/${profile.username}/edit`}
                          className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
                        Edit profile
                    </Link>
                    <button onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill ms-2">
                        Logout
                    </button>
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
                <Link to={`/profile/${profile.username}/following` } className="text-decoration-none"><b>{profile.followings}</b> Following</Link>
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
                </ul>
            </div>
        </>


    );
}
export default Profile;