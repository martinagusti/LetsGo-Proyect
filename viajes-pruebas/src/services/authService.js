import axios from "axios";

export function login(email, password){
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,{
        email,
        password
    });
}

export function signUp(name, lastName, userName, email, password, verifyPassword, bio){
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,{
        name, 
        lastName, 
        userName, 
        email, 
        password, 
        verifyPassword,
        bio
    });
}

export function editProfile(name, lastName, userName, password, verifyPassword, bio){
    return axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/updateprofile`,{
        name, 
        lastName, 
        userName,  
        password, 
        verifyPassword,
        bio
    });
}



