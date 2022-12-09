import axios from 'axios';
const API_BASE = 'http://localhost:4000';
const REVIEWS_API = `${API_BASE}/api/reviews`;

export const createReview = async (review) => {
    const response = await axios.post(REVIEWS_API, review)
    return response.data;
}
export const findReviews  = async ()     => {}
export const deleteReview = async (review) => {}
export const updateReview = async (review) => {}