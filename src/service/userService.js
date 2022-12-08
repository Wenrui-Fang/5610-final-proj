import {SERVER_URL} from "../API/api";

export const register = (user) =>
    fetch(`${SERVER_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        console.log(response)
        if (response.ok) {
            return response.json()
        } else {
            alert("The username already exists. Please try another one.")
            return response
        }
    })


export const login = (user) =>
    fetch(`${SERVER_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            alert("Oops! We are unable to find the username or the password is incorrect. Please try again.")
        }
    })


export const logout = () =>
    fetch(`${SERVER_URL}/logout`, {
        method: 'POST',
        credentials: "include"
    })

export const getProfile = () =>
    fetch(`${SERVER_URL}/profile`, {
        method: 'POST',
        credentials: "include"
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return null
        }
    })

export const getUserProfile = (userId) =>
    fetch(`${SERVER_URL}/profile/${userId}`)
        .then(response => response.json())

export const getMembers = () =>
    fetch(`${SERVER_URL}/users`)
        .then(response => response.json())

export const updateProfile = async (user) => {
    let response = await fetch(`${SERVER_URL}/api/users/${user.userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            "content-type": "application/json"
        },
        credentials: "include"
    })
    return await response.json()
}