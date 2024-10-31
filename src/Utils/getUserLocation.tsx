export function getUserLocation() {

  return new Promise((resolve, reject) => {

      function success(position: GeolocationPosition) {
          resolve([position.coords.latitude, position.coords.longitude])
      }

      function error(error: GeolocationPositionError) {
          reject(error);
      }

      navigator.geolocation.getCurrentPosition(success, error);

      
  })

}
