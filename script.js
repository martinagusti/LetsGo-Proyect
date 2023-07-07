

const lat = document.querySelector("#lat")
const lng = document.querySelector("#lng")
const city = document.querySelector("#city")
const userName = document.querySelector("#userName")
const distance = document.querySelector("#distance")
const description = document.querySelector("#description")
const votes = document.querySelector("#votes")
const img = document.querySelector("#img")

const trips = []

    function iniciarMap(){

    const status = document.querySelector(".status")
 
  

    const sucess =  async(position) => {
      
       const coordenadas = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
  
      lat.value = coordenadas.lat
      lng.value = coordenadas.long
  
    
      const transactionJson = JSON.stringify(coordenadas)
  
      const datos = await fetch(`http://localhost:3000/api/v1/trips/nearby/15000`, {
        method: "POST",
        headers: {
          "content-type":"application/json"
        },
        body: transactionJson
    })
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      return data
     
    })

    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 8,
      center: {lat: parseFloat(lat.value) , lng:parseFloat(lng.value) },
      
    });

    datos.map((element) => {
      var marker = new google.maps.Marker({
        position: {lat: parseFloat(element.latitude), lng: parseFloat(element.longitude)},
        map: map,
        draggable: false,
      });

      marker.user = element

      marker.addListener("click", function(event){
        city.textContent = (marker.user.city)
        userName.textContent = (marker.user.userName)
        description.textContent = (marker.user.description)
        votes.textContent = (marker.user.votes)
        img.src =`./public/tripImages/${marker.user.image}`
      
      });

      return marker
    })
    
    }

    
    
  
    const error = () => {
      status.textContent = "Unable to retrieve your location"
    }
  
   
    navigator.geolocation.getCurrentPosition(sucess, error);
    

}







