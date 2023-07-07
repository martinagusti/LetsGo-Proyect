import PropTypes from "prop-types"
import List from "./list/List.jsx"

import "./trips.css"

function Trips({datos, setTrips, setShowingPage, setIdTrip, setComments, setSelectProfile, setUserNameTrips, showingPage, order, distance, category, city, liked, setInFavourites}) {
   
      
      return (
          <div className="trips-container2">
            <List datos={datos} setTrips={setTrips} setShowingPage={setShowingPage} setIdTrip={setIdTrip} setComments={setComments} setSelectProfile={setSelectProfile} setUserNameTrips={setUserNameTrips} showingPage={showingPage} order={order} distance={distance} category={category} city={city} liked={liked} setInFavourites={setInFavourites}/>
          </div>
              
          
         
      )
  }
  
  Trips.propTypes = {
      datos: PropTypes.array,
      setTrips: PropTypes.func,
      setShowingPage: PropTypes.func,
      setIdTrip: PropTypes.func,
      setComments: PropTypes.func,
      setSelectProfile: PropTypes.func,
      setUserNameTrips: PropTypes.func,
      showingPage:PropTypes.string,
      order:PropTypes.string,
      distance: PropTypes.number,
      category: PropTypes.string,
      city: PropTypes.string,
      liked: PropTypes.func,
      setInFavourites:PropTypes.func,
      
      
  }
  
  
  export default Trips;