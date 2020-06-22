import InfoWindow from "./InfoWindow.js";
import Geocode from "./Geocode.js";

export default class Map {
  constructor(map, mapType, markerCreator) {
    this.googleMap = this.initMap(map, mapType);
    this.markers = [];
    this.infoWindow = new InfoWindow();
    this.geoCoder = new Geocode();
    this.address = "";
    this.MarkerCreator = markerCreator;
    this.canCreateMarker = false;
    this.currentMarketSelected = null;
  }

  setCurrentMarketSelected(marker) {
    this.currentMarketSelected = marker;
  }

  getCurrentMarketSelected() {
    return this.currentMarketSelected;
  }

  setCanCreateMarker(state) {
    this.canCreateMarker = state;
  }

  getCanCreateMarker() {
    return this.canCreateMarker;
  }

  initMap(map, mapType = "roadmap") {
    const googleMap = new google.maps.Map(map, {
      center: {
        lat: 32.610720489718126,
        lng: -115.44060356406249,
      },
      zoom: 10,
      mapTypeId: mapType,
      /* 
      draggableCursor:
        "https://image.flaticon.com/icons/svg/3063/3063196.svg), auto;", */
    });

    return googleMap;
  }

  geocodeLatLng(marker, map) {
    //let address;
    this.geoCoder.geocodeLatLng(marker, map);
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
    points.forEach((point) => {
      var currentLatLng = { lat: point.lat, lng: point.lng };

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
    const marker = this.MarkerCreator.createMarker(latLng, this.googleMap);
    this.markers.push(marker);
    //this.googleMap.panTo(latLng);

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
