import * as service from "../../services/follow-service";
import {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import "./index.css"
import {FollowList} from "../follow";

const Followers = () => {
    const {username} = useParams();
    const location = useLocation();
    const [followersUser,setFollowersUsers] = useState([]);

    const findUserFollowers = () => service.findAllUsersFollowers(username)
        .then((users)=>setFollowersUsers(users));

    useEffect(()=>{
        let user = findUserFollowers();
    },[]);

    return(
        <div className="mb-5">
            <FollowList users={followersUser} following={false} />
        </div>
    )

};

export default Followers;