import InfoWindow from "./InfoWindow.js";

export default class Map {
  constructor(map, mapType) {
    this.googleMap = this.initMap(map, mapType);
    this.markers = [];
    this.infoWindow = new InfoWindow();
    this.geoCoder = this.createGeocoder();
    this.address = "";
  }

  initMap(map, mapType = "roadmap") {
    const googleMap = new google.maps.Map(map, {
      center: {
        lat: 32.610720489718126,
        lng: -115.44060356406249,
      },
      zoom: 10,
      mapTypeId: mapType,
    });

    return googleMap;
  }

  createGeocoder() {
    return new google.maps.Geocoder();
  }

  geocodeLatLng(marker, map) {
    //let address;

    this.geoCoder.geocode(
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

  setAddress(address) {
    this.address = address;
  }

  getAddress() {
    return this.address;
  }

  openInfo(marker, content, map) {
    this.infoWindow.openInfo(marker, content, map);
  }

  renderAllPointsSaved(points) {
    console.log(points);
    points.forEach((point) => {
      var currentLatLng = { lat: point.lat, lng: point.lng };
      console.log(currentLatLng);
      this.createMarker(currentLatLng, this.getGoogleMap()).setTitle(
        point.title
      );
    });
  }

  renderPointInformation({ address, title, marker }) {
    address.value = this.address;
    title.value = marker.getTitle();
  }

  createMarker(latLng) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      draggable: true,
    });
    //marker.addListener("click", this.openInfo(marker));
    this.markers.push(marker);
    this.googleMap.panTo(latLng);
    return marker;
  }

  focusMarkerPosition(zoom = 2) {
    this.googleMap.setZoom(this.googleMap.getZoom() + zoom);
  }

  getGoogleMap() {
    return this.googleMap;
  }

  getAllMarkers() {
    return this.markers;
  }
}
