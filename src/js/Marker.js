export default class Marker {
  constructor(url) {
    this.iconUrl = url;
  }

  createMarker(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      map,
      draggable: true,
      icon: {
        scaledSize: { width: 40, height: 40 },
        url: this.iconUrl,
      },
    });
    return marker;
  }

  setIconUrl(url) {
    this.iconUrl = url;
  }
}
