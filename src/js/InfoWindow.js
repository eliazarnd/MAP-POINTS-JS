export default class InfoWindow {
  static createInfoWindow() {
    const infoWindow = new google.maps.InfoWindow({
      content: "Hola",
    });
    return infoWindow;
  }
}
