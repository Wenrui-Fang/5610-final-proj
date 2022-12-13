import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
console.log("API_BASE")
console.log(API_BASE)
const REVIEW_API = `${API_BASE}/reviews`;
export const createReview = async (review) => {
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
    console.log(REVIEW_API/review.businessname)
    const response = await axios
        .delete(`${REVIEW_API}/${review.businessname}`);
    return response.data;
}
export const updateReview = async (review) => {
    console.log(review)
    console.log("rating")
    console.log(review.rating)
    const response = await axios
        .put(`${REVIEW_API}/${review.businessname}`, review);
    return review;
}