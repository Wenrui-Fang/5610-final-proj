import * as service from "../../services/follow-service";
import {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import "./index.css"
import {FollowList} from "../follow";


const Following = () => {
    const {username} = useParams();
    const [followingUser,setFollowedUsers] = useState([]);

    const findFollowingUser = () =>
        service.findAllUsersFollowing(username)
            .then((users)=>setFollowedUsers(users));

    useEffect(()=>{
        let user = findFollowingUser();
        console.log(followingUser);
    },[]);

    return(
        <div>
            <FollowList users={followingUser} following={true}/>
        </div>
    );



};

export default Following;