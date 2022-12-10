import axios from "axios";
//const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = 'http://localhost:4000'
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
                             withCredentials:true
                         });

export const userTogglesUserFollows = (uid1,uid2) =>
    api.put(`${USERS_API}/${uid1}/follows/${uid2}`)
        .then(response=>response.data);

export const findAllUsersFollowing = (username) =>
    api.get(`${USERS_API}/${username}/followings`)
        .then(response=>response.data);

export const findAllUsersFollowers = (username) =>
    api.get(`${USERS_API}/${username}/followers`)
        .then(response=>response.data);