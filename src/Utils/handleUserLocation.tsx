import { getUserLocation } from "./getUserLocation"
import { newAlert } from "./newAlert"
import { HandleUserLocationProps } from "../data/types"


export function handleUserLocation({setAlert, setMarkerPosition}: HandleUserLocationProps){

    getUserLocation()
    .then(location =>{
        console.log(location)
        setMarkerPosition(location) //CORREGIR  
    })

    .catch((error: GeolocationPositionError) =>{

      switch (error.code) {
        
        case error.PERMISSION_DENIED:
          newAlert({setAlert, string: "Please allow location access for better accuracy."})    
          break

        default:
          newAlert({setAlert, string: "Unable to access location"})    
          break

      }

      
    })


}