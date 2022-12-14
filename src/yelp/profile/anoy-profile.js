
import React from "react";

const AnoyProfile = ({profile}) => {

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