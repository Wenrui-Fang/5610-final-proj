import axios from "axios";
import * as foodServices from "./foodServices";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USER_URL = `${BASE_URL}/api/users`
const LIST_URL = `${BASE_URL}/api/food-lists`

const api = axios.create({
    withCredentials: true
});

export const createList = (uid, foodList) => {
    return api.post(`${USER_URL}/${uid}/food-lists`, foodList)
        .then(response => response.data);
}
export const findAllListsOwnedByUser = (uid) => {
    return api.get(`${USER_URL}/${uid}/food-lists`)
        .then(response => response.data);
}
export const findListById = (lid) => {
    return api.get(`${LIST_URL}/${lid}`)
        .then(response => response.data);
}
export const findAllListsOwnedByUserWithFoodDetails = async (uid) => {
    let lists = await findAllListsOwnedByUser(uid)
    lists = await Promise.all(lists.map(async l => {
        l.food = await Promise.all(l.food.map(async mid => await foodServices.findFoodDetail(mid)));
        return l;
    }))
    return lists;
}
export const findListByIdWithFoodDetails = async (lid) => {
    let list = await findListById(lid);
    if (list) {
        list.food = await Promise.all(list.food.map(async mid => await foodServices.findFoodDetail(mid)));
    }
    return list;
}
export const deleteList = (lid) => {
    return api.delete(`${LIST_URL}/${lid}`)
        .then(response => response.data);
}
export const updateList = (uid, lid, foodList) => {
    return api.put(`${USER_URL}/${uid}/food-lists/${lid}`, foodList)
        .then(response => response.data);
}