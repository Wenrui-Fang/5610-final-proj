import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as service from "../../services/auth-service";

const EditProfile = () => {
    const [profile, setProfile] = useState({});
    const [updateUser,setUpdateUser] = useState({});
    const navigate = useNavigate();

    const imageData = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleProfilePhoto = async (event) => {
        const file = event.target.files[0]
        const img = await imageData(file)
        setUpdateUser({...updateUser,
                          profilePhoto: img})
    }


    useEffect(() => {
        try {
            const getProfile = async() => await service.profile().then((user) => {
                if(user.dateOfBirth!==undefined){
                    user.dateOfBirth = user.dateOfBirth.substring(0,10).toString();
                }
                setUpdateUser(user);
                setProfile(user);
            });
            const user = getProfile();
        } catch (e) {
        }
    }, []);

    /**
     * Update user information
     */
    const editProfile = () => {
        service.update(updateUser)
            .then(()=>navigate('/login'))
            .catch(e => alert(e));

    }

    return(
        <div className="ttr-edit-profile">
            <div className="border border-bottom-0">
                <div className="float-end">
                    <Link to={`/profile/${profile.username}`} className="btn btn-light rounded-pill fa-pull-left fw-bolder mt-2 mb-2 ms-2">
                        <i className="bi bi-x-circle"/>
                    </Link>
                    <button className="btn btn-dark rounded-pill fa-pull-right fw-bolder mt-2 mb-2 me-2" onClick={editProfile}>
                        Save
                    </button>
                </div>
                <h4 className="p-2 mb-0 pb-0 fw-bolder">Edit profile</h4>
                <div className="mt-3 mb-5 position-relative">
                    <div className="wd-banner-photo"/>
                    <img src={profile.profilePhoto===undefined?"https://pbs.twimg.com/profile_images/1599202909962412032/QbvIJjti_400x400.jpg":`${profile.profilePhoto}`} className="wd-profile-photo"/>
                </div>
            </div>
            <form action="profile.html">
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="username">Username</label>
                    <input id="username" title="Username" readOnly
                           className="p-0 form-control border-0"
                           value={`${profile.username}`}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="first-name">First name</label>
                    <input id="first-name"
                           className="p-0 form-control border-0"
                           onChange={(e)=>
                               setUpdateUser({...updateUser,firstName: e.target.value})}
                           defaultValue={profile.firstName===undefined?``:`${profile.firstName}`}
                    />
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="last-name">Last name</label>
                    <input id="last-name"
                           className="p-0 form-control border-0"
                           onChange={(e)=>
                               setUpdateUser({...updateUser,lastName: e.target.value})}
                           defaultValue={profile.lastName===undefined?``:`${profile.lastName}`}
                    />
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="thingsILove">Things I Love</label>
                    <textarea
                        className="p-0 form-control border-0" id="thingsILove"
                        onChange={(e)=>
                            setUpdateUser({...updateUser,thingsILove: e.target.value})}
                        defaultValue={profile.thingsILove===undefined?`You haven't told us yet ... do tell!`:`${profile.thingsILove}`}>
              </textarea>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="date-of-birth">Birthday</label>
                    <input id="date-of-birth"
                           className="p-0 form-control border-0"
                           onChange={(e) =>
                               setUpdateUser({...updateUser,dateOfBirth: e.target.value})}
                           type="date"
                           defaultValue={profile.dateOfBirth===undefined?"1998-09-28":`${profile.dateOfBirth}`}
                           required="required"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="email">Email</label>
                    <input id="email" placeholder={`${profile.email}`}
                           className="p-0 form-control border-0"
                           type="email"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="password">Reset password</label>
                    <input id="password"
                           className="p-0 form-control border-0"
                           type="password"
                           onChange={(e) =>
                               setUpdateUser({...updateUser,password: e.target.value})}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="photo">Profile photo</label>
                    <input id="photo"
                           className="p-0 form-control border-0"
                           onChange={e => handleProfilePhoto(e)}
                           type="file" name="myImage" accept="image/png, image/jpg"
                    />
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label for="account">Select account</label>
                    <select
                        className="p-0 form-control border-0"
                        id="account" >
                        <option>Business account</option>
                        <option selected>Personal account</option>
                    </select>
                </div>
            </form></div>
    );
};

export default EditProfile;