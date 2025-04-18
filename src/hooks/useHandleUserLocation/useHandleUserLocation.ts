import { getUserLocation } from '../../Utils/getUserLocation'
import { newAlert } from '../../Utils/newAlert'
import { useEffect } from 'react'
import type { LatLngExpression } from 'leaflet'
import { useMap } from 'react-leaflet'
import type { AlertState, LocationMarkerState } from 'data/types'

interface UseHandleUserLocationProps extends LocationMarkerState, Pick<AlertState, 'setFormAlert'> {}

export function useHandleUserLocation({ markerPosition, setFormAlert, setMarkerPosition }: UseHandleUserLocationProps) {
  const map = useMap()

  useEffect(() => {
    if (markerPosition) return

    getUserLocation()
      .then((loc: LatLngExpression) => {
        setMarkerPosition(loc)
        map.setView(loc)
      })
      .catch((error: GeolocationPositionError) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            newAlert({ setFormAlert, string: 'Please allow location access for better accuracy.', color: 'red' })
            break

          default:
            newAlert({ setFormAlert, string: 'Unable to access location', color: 'red' })
            break
        }
      })
  }, [map, markerPosition, setFormAlert, setMarkerPosition])
}
