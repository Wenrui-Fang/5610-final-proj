import * as yelp from "@yelp-developers/v1.0#2hsur2ylbank95o";
export const SERVER_URL = "http://localhost:8080";
export const PUBLIC_API = "https://www.yelp.com/developers/documentation/v2/search_api";
export const FOOD_REVIEWS_API_URL = (foodId) => `http://127.0.0.1:8080/api/food/${foodId}/reviews`
export const REVIEWS_API_URL = "http://localhost:8080/api/reviews"
export const USERS_REVIEWS_API_URL = (userId) => `http://localhost:8080/api/users/${userId}/reviews`
export const APPLICATIONS_API_URL = "http://localhost:8080/api/applications"
export const FOOD_APPLICATIONS_API_URL = (foodId) => `http://127.0.0.1:8080/api/food/${foodId}/applications`
export const API_KEY = "jDR8aRNofE5yhPxSQSKag2BeSB0XUGtnqfeMOU3iYwrtiWMyr_yeQLJ6LyXSF4GfAGs550h09s7ahRZcVNh1lIQ4HYo0PVhJ5IeI484VVQjVHx7yfgTPSfrHvCCRY3Yx"
export const FOOD_PROFILES_API_URL = "http://localhost:8080/api/foodProfiles"
export const USERS_APPLICATIONS_API_URL = (userId) => `http://localhost:8080/api/users/${userId}/applications`
export const foodFinderClient = new foodfinder.Client({ apiKey: "jDR8aRNofE5yhPxSQSKag2BeSB0XUGtnqfeMOU3iYwrtiWMyr_yeQLJ6LyXSF4GfAGs550h09s7ahRZcVNh1lIQ4HYo0PVhJ5IeI484VVQjVHx7yfgTPSfrHvCCRY3Yx"})