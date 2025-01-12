import { getUserLocation } from "../Utils/getUserLocation"
import { newAlert } from "../Utils/newAlert"
import { useEffect } from "react"
import type { LatLngExpression } from "leaflet"
import { useMap } from "react-leaflet"
import type  { AlertState, LocationMarkerState } from "data/types"

interface UseHandleUserLocationProps extends LocationMarkerState, Pick <AlertState, "setAlert">{}

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