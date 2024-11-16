import { useMapEvents } from "react-leaflet"
import { MapClickProps } from "../../data/types"


export function MapClick({setMarkerPosition}:MapClickProps) {
    useMapEvents({
        click(e) {
          setMarkerPosition([e.latlng.lat, e.latlng.lng])
        },
      })

      return null
      
}