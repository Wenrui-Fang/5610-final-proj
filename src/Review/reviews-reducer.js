import { createSlice } from "@reduxjs/toolkit";
import reviews from './reviews.json';
import {
    createReviewThunk,
    deleteReviewThunk,
    findReviewThunk,
    updateReviewThunk
} from "../services/review-thunks";

const initialState = {
    reviews: [],
    loading: false
}

const currentUser = {
    "userName": "Anna",
    "handle": "@yelp",
    "image": "pizza.png",
};
const templateReview = {
    ...currentUser,
    "businessname": "GRANVILLE",
    "userName": "Shannon R.",
    "rating": "4.9",
    "hours": "11 a.m. to 8 p.m. 7 days a week",
    "image": "https://s3-media0.fl.yelpcdn.com/bphoto/3KQX-y1nbWFAr8mt-I9vNg/l.jpg",
    "review": "Great food, great staff, great music! Sami was amazing, very attentive and her recommendations were great! Definitely will be back! Thanks Granvillefor the experience"
}

const reviewsSlice = createSlice({

   name: 'reviews',
   initialState,

    extraReducers: {
       [findReviewThunk.pending]:
           (state) => {
               state.loading = true
               state.reviews = []
           },
       [findReviewThunk.fulfilled]:
           (state, { payload }) => {
               state.loading = false
               state.reviews = payload
           },
       [findReviewThunk.rejected]:
           (state) => {
               state.loading = false
           },

        [deleteReviewThunk.fulfilled] :
            (state, { payload }) => {
                state.loading = false
                state.reviews = state.reviews
                    .filter(t => t.businessname !== payload.businessname)
            },
        [createReviewThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.reviews.push(payload)
            },
        [updateReviewThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                const reviewNdx = state.reviews
                    .findIndex((t) => t.businessname === payload.businessname)
                state.reviews[reviewNdx] = payload
            }
    },

   reducers: {
       deleteReview(state, action) {

           const index = state
               .findIndex(review =>
                              review.businessname === action.payload);
           state.splice(index, 1);
       },

       createReview(state, action) {
           state.unshift({
                             ...action.payload,
                             ...templateReview,
               businessname: (new Date()).getTime(),})
       }
   }
});

export const {createReview,deleteReview} = reviewsSlice.actions;
export default reviewsSlice.reducer;