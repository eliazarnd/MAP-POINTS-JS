import InfoWindow from "./InfoWindow.js";

export default class Map {
  constructor(map, mapType) {
    this.googleMap = this.initMap(map, mapType);
    this.markers = [];
    this.infoWindow = InfoWindow.createInfoWindow();
    this.geoCoder = this.createGeocoder();
  }

  initMap(map, mapType) {
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
    this.geoCoder.geocode({ location: marker.getPosition() }, function (
      results,
      status
    ) {
      console.log(map);
      if (status === "OK") {
        if (results[0]) {
          map.openInfo(marker, results[0].formatted_address);

          console.log(results[0].formatted_address);
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }

  openInfo(marker, content) {
    console.log(this);
    this.infoWindow.setContent(`
    ${content}
    `);
    this.infoWindow.open(this.googleMap, marker);
  }

  renderAllPointsSaved(points) {
    console.log(points);
    points.forEach((point) => {
      var currentLatLng = { lat: point.lat, lng: point.lng };
      console.log(currentLatLng);
      this.createMarker(currentLatLng, this.getGoogleMap());
    });
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
    //console.log(this.googleMap);
    this.googleMap.setZoom(this.googleMap.getZoom() + zoom);
  }

  getGoogleMap() {
    return this.googleMap;
  }

  getAllMarkers() {
    return this.markers;
  }
}
