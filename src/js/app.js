import points from "./db.js";
import Map from "./Map.js";

const $map = document.getElementById("map");
const $address = document.querySelector(".address");
const $titlePoint = document.querySelector(".title-point");

console.log($address);

const map = new Map($map);
map.getGoogleMap().setTilt(45);

map.getGoogleMap().addListener("click", (eventMap) => {
  //console.log(map.getGoogleMap());
  const marker = map.createMarker(eventMap.latLng);
  marker.setLabel("A");
  marker.setTitle("TitlePoint");
  console.log(marker.getTitle());

  marker.addListener("dragend", (mark) => {
    console.log(marker.getPosition());
  });

  marker.addListener("click", (mark) => {
    map.geocodeLatLng(marker, map);
    setTimeout(function () {
      map.openInfo(marker, map.getAddress(), map.getGoogleMap());
      map.renderPointInformation({
        address: $address,
        title: $titlePoint,
        marker: marker,
      });
    }, 300);

    //map.focusMarkerPosition();
  });

  const markers = map.getAllMarkers();
  //console.log(markers);
});

map.renderAllPointsSaved(points);

function getCoordsFromPosition(position) {
  const coords = position.coords;

  return coords;
}

//google.maps.event.addDomListener(window, "load", map);
