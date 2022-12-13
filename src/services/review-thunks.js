import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./review-service";
import axios from 'axios';
const REVIEW_API = 'http://localhost:4000/api/reviews';

export const findReviewThunk = createAsyncThunk(
    'review/findReview', async () =>
        await service.findReview()
);
export const createReviewThunk = createAsyncThunk(
    'review/createReview', async (review) =>
        await service.createReview(review)

)

export const deleteReviewThunk = createAsyncThunk(
    'review/deleteReview', async (review)=>
        await service.deleteReview(review)


)

export const updateReviewThunk = createAsyncThunk(

    'review/updateReview',
    async (review) =>
        await service.updateReview(review)


)