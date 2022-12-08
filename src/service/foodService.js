import {foodFinderClient, SERVER_URL} from "../API/api";

export const findDetailById = async (id) => {
    let food = await foodFinderClient.food.show(id);
    return food;

    export const searchFood = async (search) => {

        let localResult = await searchLocalFood(search)
        let remoteResult = await searchRemoteFood(search)

        return {
            local: localResult,
            remote: remoteResult
        }

    }

    const searchLocalFood = async (searchParams) => {

        let response = await fetch(`${SERVER_URL}/search/food`, {
            method: 'POST',
            body: JSON.stringify(searchParams),
            headers: {
                'content-type': 'application/json'
            },
        })
        if (response.ok) {
            return response.json()
        } else {
            console.log(response)
        }
    }

    const searchRemoteFood = async (search) => {
        let searchParams = {limit: 100}
        for (const prop in search) {
            if (search[prop] !== '' && search[prop] !== undefined) {
                searchParams[prop] = search[prop]
            }
        }
        let apiResult = await foodFinderClient.food.search(searchParams)
            .catch(err => {
                console.log(err.request, err.response, err.invalidParams);
                // check errors
            })
        return apiResult.data.food
    };


    export default {
        findDetailById, searchFood
    }
}