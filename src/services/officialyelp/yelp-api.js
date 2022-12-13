import axios from "axios";

const BASE_URL = 'http://localhost:4000'
const OFFICIAL_YELP_FIND_BY_INPUT_API = `${BASE_URL}/api/businesses`;

const api = axios.create({});

export const findBusinessById = (bid) =>
    api.get(`${BASE_URL}/api/business/${bid}`)
      .then(response=>response.data);

export const findBusinesses = ([term, location]) =>
    api.get(`${OFFICIAL_YELP_FIND_BY_INPUT_API}?term=${term}&location=${location}`)
        .then(response=>response.data);
