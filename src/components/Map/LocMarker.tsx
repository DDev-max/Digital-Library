import { Marker, Popup, useMap } from "react-leaflet";
import { LocMarkerProps } from "../../data/types";


export function LocMarker({ markerPosition}: LocMarkerProps) {
  

    const map = useMap()
    map.setView(markerPosition)


    return (
        <Marker position={markerPosition} >
            <Popup>
                Click to set your address
            </Popup>
            
        </Marker>
    )
}