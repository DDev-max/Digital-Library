import type { LocationMarkerState } from 'data/types'
import { useMapEvents } from 'react-leaflet'

export function MapClick({ setMarkerPosition }: Pick<LocationMarkerState, 'setMarkerPosition'>) {
  useMapEvents({
    click(e) {
      setMarkerPosition([e.latlng.lat, e.latlng.lng])
    },
  })

  return null
}
