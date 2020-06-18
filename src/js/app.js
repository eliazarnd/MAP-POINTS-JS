import points from "./db.js";
import Map from "./Map.js";

const $map = document.getElementById("map");

const map = new Map($map, "satellite");
map.getGoogleMap().setTilt(45);

map.getGoogleMap().addListener("click", (eventMap) => {
  //console.log(map.getGoogleMap());
  const marker = map.createMarker(eventMap.latLng);

  console.log(map.infoWindow);
  marker.addListener("mouseover", (mark) => {
    map.geocodeLatLng(marker, map);
  });

  marker.addListener("dragend", (mark) => {
    console.log(marker.getPosition());
  });

  marker.addListener("click", (mark) => {
    map.focusMarkerPosition();
  });

  const markers = map.getAllMarkers();
  //console.log(markers);
});

map.getGoogleMap().addListener("drag", (mapEvent) => {
  console.log(mapEvent);
});

map.renderAllPointsSaved(points);

function getCoordsFromPosition(position) {
  const coords = position.coords;

  return coords;
}

//google.maps.event.addDomListener(window, "load", map);
