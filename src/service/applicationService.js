import {
    FOOD_APPLICATIONS_API_URL,
    APPLICATIONS_API_URL,
    USERS_APPLICATIONS_API_URL

} from "../API/api";



export const findApplications = async() => {
    let response = await fetch(APPLICATIONS_API_URL);
    return await response.json()
};

export const findApplicationsForPet = async (petId) => {
    let response = await fetch(PETS_APPLICATIONS_API_URL(petId))
    return await response.json()
};

export const createApplication = async (petId, application) => {
    let response = await fetch(PETS_APPLICATIONS_API_URL(petId), {
        method: 'POST',
        body: JSON.stringify(application),
        headers: {
            'content-type': 'application/json'
        }
    })
    return await response.json()
};

export const findApplicationsForUser = async (userId) => {
    console.log(userId);
    let response = await fetch(USERS_APPLICATIONS_API_URL(userId));
    return await response.json();
}

export const updateApplication = async (application) => {
    let response = await fetch(`${APPLICATIONS_API_URL}/${application.id}`, {
        method: 'PUT',
        body: JSON.stringify(application),
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}

export const deleteApplication = async (applicationId) => {
    let response = await fetch(`${APPLICATIONS_API_URL}/${applicationId}`, {
        method: 'DELETE'
    })
    return await response.json()
}


export default {
    findApplications, createApplication, findApplicationsForPet, findApplicationsForUser, updateApplication, deleteApplication
}
