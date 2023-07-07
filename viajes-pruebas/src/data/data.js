/* import { allTripsAxios, favourites, isLike } from "../services"

const user = JSON.parse(localStorage.getItem("user"))

export const tripsLiked = async() => {
    let viajes = await allTripsAxios()
    if(user){
      viajes.map(async(element) => {
        element.like = await isLike(element.ID)
    })
    viajes.map(async(element) => {
      element.favourites = await favourites()
    })
    }
   
  return viajes
}
 */
