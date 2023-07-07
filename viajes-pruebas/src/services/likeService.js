import axios from "axios";



export const likeTrip = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/votes/${id}`,)
    }
   
};

export const isLike = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
        try {
        let isLiked = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/votes/like/${id}`,)
        return isLiked
        } catch (error) {
            console.log(error)
        }
    }
    
    
};