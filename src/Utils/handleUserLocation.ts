import { getUserLocation } from "./getUserLocation"
import { newAlert } from "./newAlert"
import { useEffect } from "react"
import { LatLngExpression } from "leaflet"
import { useMap } from "react-leaflet"
import { UseHandleUserLocationProps } from "data/types"



export function useHandleUserLocation({ markerPosition, setAlert, setMarkerPosition}:UseHandleUserLocationProps){
  const map = useMap()

  
  useEffect(() => {
    if (markerPosition) return

    getUserLocation().then((loc: LatLngExpression) => {
      setMarkerPosition(loc)
      console.log("puesto en :", loc);
      map.setView(loc)
    }).catch((error: GeolocationPositionError) => {
      switch (error.code) {

        case error.PERMISSION_DENIED:
          newAlert({ setAlert, string: "Please allow location access for better accuracy." })
          break

        default:
          newAlert({ setAlert, string: "Unable to access location" })
          break

      }

    })

  }, [map, markerPosition, setAlert, setMarkerPosition])


}