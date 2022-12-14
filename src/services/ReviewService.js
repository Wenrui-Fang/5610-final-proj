import axios from 'axios';
const API_BASE = 'http://localhost:4000';
const REVIEWS_API = `${API_BASE}/api/reviews`;
const api = axios.create({
                         });


export const createReview = async (review) => {
    const response = await axios.post(REVIEWS_API, review)
    return response.data;
}

export const findReviews = async ()=> api.get(REVIEWS_API)
        .then(response=>response.data)


export const deleteReview = async (rid) => api.delete(`${REVIEWS_API}/${rid}`)
        .then(response=>response.data);


export const getReviewsByBusinessId = async(bid)=> api.get(`${API_BASE}/api/business/${bid}/reviews`)
        .then(response=>response.data);
