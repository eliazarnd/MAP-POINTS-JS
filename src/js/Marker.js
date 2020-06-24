export default class Marker {
  constructor(url) {
    this.iconUrl = url;
  }

  createMarker(latLng, map, id) {
    let marker = new google.maps.Marker({
      position: latLng,
      map,
      draggable: true,
      icon: {
        scaledSize: { width: 40, height: 40 },
        url: this.iconUrl,
      },
    });
    marker.id = id;
    return marker;
  }

  setIconUrl(url) {
    this.iconUrl = url;
  }
}
