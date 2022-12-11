import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import User from "./user";
import * as authService from "../../services/auth-service";

export const FollowList = ({users,following}) => {

    const {username} = useParams();
    const [currentUser,setCurrentUser] = useState({});

    useEffect(() => {
        try {
            const getUser = async() => await authService.profile().then(user=>setCurrentUser(user));
            let user = getUser();
        } catch (e) {

        }
    }, [username]);


    return (
        <div className="list-group">
            {
                following&&users.map(user => <User key={user.userFollowed.username} user={user.userFollowed}/>)
            }
            {
                !following&&users.map(user => <User key={user.userFollowing.username} user={user.userFollowing}/>)
            }
        </div>
    )

}