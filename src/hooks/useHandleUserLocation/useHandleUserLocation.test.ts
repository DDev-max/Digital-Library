import { renderHook, waitFor } from '@testing-library/react';
import { useHandleUserLocation } from './useHandleUserLocation';
import { getUserLocation } from 'Utils/getUserLocation';
import { useMap } from 'react-leaflet';
import { newAlert } from 'Utils/newAlert';

const setFormAlert = jest.fn();
const setMarkerPosition = jest.fn();

jest.mock('Utils/getUserLocation');
jest.mock('Utils/newAlert');

describe('location accessed', () => {
  it("shouldnt call 'getUserLocation' if theres already a location", () => {
    const markerPosition: [number, number] = [222, 333];

    renderHook(useHandleUserLocation, { initialProps: { markerPosition, setFormAlert, setMarkerPosition } });

    expect(getUserLocation).not.toHaveBeenCalled();
  });

  it('should set marker position if location is found', async () => {
    const mockLocation = { lat: 40.7128, lng: -74.006 };

    (getUserLocation as jest.Mock).mockResolvedValue(mockLocation);

    renderHook(useHandleUserLocation, { initialProps: { markerPosition: undefined, setFormAlert, setMarkerPosition } });

    expect(getUserLocation).toHaveBeenCalled();

    await waitFor(() => {
      expect(setMarkerPosition).toHaveBeenCalledWith(mockLocation);
    });

    await waitFor(() => {
      expect(useMap().setView).toHaveBeenCalledWith(mockLocation);
    });
  });
});

describe('location denied', () => {
  const markerPosition = undefined;

  it("should call 'newAlert' if permission is denied", async () => {
    (getUserLocation as jest.Mock).mockRejectedValueOnce({ code: 1, PERMISSION_DENIED: 1 } as GeolocationPositionError);

    renderHook(useHandleUserLocation, { initialProps: { markerPosition, setFormAlert, setMarkerPosition } });

    await waitFor(() => {
      expect(newAlert).toHaveBeenCalledWith({ setFormAlert, string: 'Please allow location access for better accuracy.', color: 'red' });
    });
  });

  it('should handle other errors', async () => {
    (getUserLocation as jest.Mock).mockRejectedValueOnce({ code: 3 } as GeolocationPositionError);

    renderHook(useHandleUserLocation, { initialProps: { markerPosition, setFormAlert, setMarkerPosition } });

    await waitFor(() => {
      expect(newAlert).toHaveBeenCalledWith({ setFormAlert, string: 'Unable to access location', color: 'red' });
    });
  });
});
