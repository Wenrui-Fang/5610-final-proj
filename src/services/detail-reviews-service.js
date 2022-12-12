import axios from "axios";

const REVIEWS_API = `${API_BASE}/api/reviews`;

export const findAllReviews = async () => {
    const response = await axios.get(REVIEWS_API);
    const reviews = response.data;
    return reviews;
}