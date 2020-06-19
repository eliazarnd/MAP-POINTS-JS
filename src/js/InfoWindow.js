export default class InfoWindow {
  constructor() {
    this.infoWindow = this.createInfoWindow();
  }

  createInfoWindow() {
    const infoWindow = new google.maps.InfoWindow({
      content: "Hola",
    });
    return infoWindow;
  }

  openInfo(marker, content, map) {
    this.infoWindow.setContent(`
    ${content}
    `);
    this.infoWindow.open(this.map, marker);
  }
}
