
    export const getDistance = (lat1, lon1, lat2, lon2) => {
                  
        let r = 6371;
        let dLat = deg2rad(lat2-lat1);
        let dLon = deg2rad(lon2-lon1);
    
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
    
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        var d = r * c;
        return d;
    
        
    
        function deg2rad(n){
              return n * (Math.PI/180);
              }

}