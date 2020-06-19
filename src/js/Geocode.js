export default class Geocode {
  constructor() {
    this.geocoder = this.createGeocoder();
  }

  createGeocoder() {
    return new google.maps.Geocoder();
  }

  geocodeLatLng(marker, map) {
    //let address;

    this.geocoder.geocode(
      { location: marker.getPosition() },
      (results, status) => {
        if (results[0]) {
          if (status === "OK") {
            map.setAddress(results[0].formatted_address);
          }
        }
      }
    );
  }
}
