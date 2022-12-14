import axios from "axios";

const BASE_URL = 'http://localhost:4000';
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials:true
});

export const findAllBookmarksByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/bookmarks`)
        .then(response => response.data);