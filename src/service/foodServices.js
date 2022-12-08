import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const FOOD_URL = `${BASE_URL}/api/food`;
const SEARCH_URL = `${BASE_URL}/api/search`;
const FOOD_STATS_URL = `${BASE_URL}/api/food-stats`;
const USER_URL = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const findPopularFood = (page) => {
    return axios.get(`${FOOD_URL}/popular/${page}`)
        .then(response => response.data.results);
}
export const findNowPlayingFood = (page) => {
    return axios.get(`${FOOD_URL}/now-playing/${page}`)
        .then(response => response.data.results);
}
export const findTopRatedFood = (page) => {
    return axios.get(`${FOOD_URL}/top-rated/${page}`)
        .then(response => response.data.results);
}
export const findUpcomingFood = (page) => {
    return axios.get(`${FOOD_URL}/upcoming/${page}`)
        .then(response => response.data.results);
}
export const searchFood = (query, page) => {
    return axios.get(SEARCH_URL, {params: {query: query, page: page}})
        .then(response => response.data.results);
}
export const findFoodDetail = (mid) => {
    return axios.get(`${FOOD_URL}/${mid}`)
        .then(response => response.data);
}
export const findFoodCredits = (mid) => {
    return axios.get(`${FOOD_URL}/${mid}/credits`)
        .then(response => response.data);
}
export const getRecommendationsByFood = (mid, page) => {
    return axios.get(`${FOOD_URL}/${mid}/recommendations/${page}`)
        .then(response => response.data.results);
}
export const findFoodStats = (mid) => {
    return axios.get(`${FOOD_STATS_URL}/${mid}`)
        .then(response => response.data);
}
export const userLikesFood = (uid, mid) => {
    return api.post(`${USER_URL}/${uid}/food-likes/${mid}`)
        .then(response => response.data);
}
export const findAllFoodLikedByUser = (uid) => {
    return api.get(`${USER_URL}/${uid}/food-likes`,
        {headers: {"Cache-Control": "no-cache"}})
        .then(response => response.data);
}
export const findAllFoodLikedByUserWithFoodDetails = async (uid) => {
    let food = await findAllFoodLikedByUser(uid);
    food = food.map(m => m.foodId);
    food = await Promise.all(food.map(async mid => await findFoodDetail(mid)));
    return food;
}
export const findUserLikesFood = (uid, mid) => {
    return api.get(`${USER_URL}/${uid}/food-likes/${mid}`,
        {headers: {"Cache-Control": "no-cache"}})
        .then(response => response.data);
}