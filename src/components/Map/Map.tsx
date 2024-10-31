import { MapContainer, TileLayer } from "react-leaflet";
import { LocMarker } from "./LocMarker";
import { useEffect } from "react";
import { MapClick } from "./MapClick";
import { useHighlightCntxt } from "../../Context/useHighlightContxt";
import { handleUserLocation } from "../../Utils/handleUserLocation";
import { MapProps } from "../../data/types";

export function Map({markerPosition,setMarkerPosition}:MapProps) {

  const context = useHighlightCntxt()


  useEffect(()=>{

    if (!context) return
    const {setAlert} = context
    handleUserLocation({setAlert,setMarkerPosition})

  }, [])


  

  
    return (
      <MapContainer center={markerPosition} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClick setMarkerPosition={setMarkerPosition}/>
        <LocMarker markerPosition={markerPosition}/>
      </MapContainer>
    );
}









