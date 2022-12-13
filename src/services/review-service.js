import axios from 'axios';

//const TUITS_API = 'http://localhost:4000/api/tuits';
//const TUITS_API = 'https://tuiter-node-server.herokuapp.com/api/tuits';
const API_BASE = process.env.REACT_APP_API_BASE;
console.log("API_BASE")
console.log(API_BASE)
const REVIEW_API = `${API_BASE}/reviews`;
export const createReview = async (tuit) => {
    const response = await axios.post(REVIEW_API, review)
    return response.data;
}
export const findReview = async () => {
    const response = await axios.get(REVIEW_API);
    const reviews = response.data;
    return reviews;
}
export const deleteReview = async (review) => {
    console.log(review)
    console.log(REVIEW_API/review._id)
    const response = await axios
        .delete(`${REVIEW_API}/${review._id}`);
    return response.data;
}
export const updateReview = async (review) => {
    console.log(review)
    console.log("likes")
    console.log(review.likes)
    const response = await axios
        .put(`${REVIEW_API}/${review._id}`, review);
    return review;
}