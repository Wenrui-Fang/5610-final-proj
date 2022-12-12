import axios from "axios";

const BASE_URL = 'http://localhost:4000'
const OFFICIAL_YELP_QUERY_API = `${BASE_URL}/api/businesses`;

const api = axios.create({});

export const findBusinesses = (location) =>
    api.get(`${OFFICIAL_YELP_QUERY_API}?location=${location}`)
        .then(response=>response.data);

export const findBusinessById = (bid) =>
    api.get(`${BASE_URL}/api/business/${bid}`)
        .then(response=>response.data);