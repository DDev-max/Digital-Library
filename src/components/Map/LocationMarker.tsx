import type { AlertState, LocationMarkerState } from 'data/types'
import L from 'leaflet'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { useHandleUserLocation } from 'hooks/useHandleUserLocation/useHandleUserLocation'

interface LocationMarkerProps extends LocationMarkerState, Pick<AlertState, 'setFormAlert'> {}

export function LocationMarker({ markerPosition, setFormAlert, setMarkerPosition }: LocationMarkerProps) {
  const icon = new L.Icon({ iconUrl: '/marker-icon.webp', iconSize: [40, 40] })

  useHandleUserLocation({ markerPosition, setFormAlert, setMarkerPosition })

  useMapEvents({
    click(e) {
      setMarkerPosition([e.latlng.lat, e.latlng.lng])
    },
  })

  return (
    markerPosition && (
      <>
        <Marker position={markerPosition} icon={icon}>
          <Popup>Click on the map to set your address</Popup>
        </Marker>
      </>
    )
  )
}
