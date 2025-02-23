import { MapContainer, TileLayer } from 'react-leaflet'
import { LocationMarker } from './LocationMarker'
import type { AlertState, LocationMarkerState } from 'data/types'

interface MapProps extends LocationMarkerState, Pick<AlertState, 'setAlert'> {
  divClassName: string
}

export default function Map({ divClassName, markerPosition, setMarkerPosition, setAlert }: MapProps) {
  return (
    <div className={divClassName} role='region' aria-label='Interactive map. Activate the location if you have not already done so.'>
      <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarker markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} setAlert={setAlert} />
      </MapContainer>
    </div>
  )
}
