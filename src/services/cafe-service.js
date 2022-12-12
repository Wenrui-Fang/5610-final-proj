import axios from "axios";
const BASE_URL = `http://localhost:4000`
const CAFE_API = `${API_BASE}/api/reviews`;

export const findCafeById = (uid) =>
    axios.get(`${CAFE_API}/${uid}`)
        .then(response => response.data);

const cafe_service = {
    findCafeById
}

export default cafe_service;