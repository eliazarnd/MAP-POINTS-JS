import points from "./db.js";
import Map from "./Map.js";
import Marker from "./Marker.js";

import DataBase from "./dataBase.js";

import createAnNoty from "./Noty/utilNoty.js";

const db = new DataBase("Points");

db.createDataBase();

console.log(db);

const $map = document.getElementById("map");
const $address = document.querySelector(".address");
const $titlePoint = document.querySelector(".title-point");
let canCreatePoints = false;

//https://pngimg.com/uploads/gps/gps_PNG22.png

const markersURL = {
  default: "https://pngimg.com/uploads/gps/gps_PNG22.png",
  normal: "https://image.flaticon.com/icons/svg/3063/3063196.svg",
  test: "https://image.flaticon.com/icons/svg/1483/1483336.svg",
};

const map = new Map($map, "roadmap", new Marker(markersURL.test));

map.getGoogleMap().setTilt(45);

map.getGoogleMap().addListener("click", (eventMap) => {
  //console.log(map.getGoogleMap());
  console.log(points);
  if (map.getCanCreateMarker()) {
    const marker = map.createMarker(eventMap.latLng);

    console.log(marker.getTitle());
    map.setCanCreateMarker(false);
    map.getGoogleMap().setOptions({ draggableCursor: "" });
    marker.addListener("click", (mark) => {
      renderAddress(marker, map);
      map.setCurrentMarketSelected(marker);
      console.log(map);
      //map.focusMarkerPosition();
    });

    marker.addListener("dragend", (mark) => {
      renderAddress(marker, map);
    });
  } else {
    createAnNoty(
      "warning",
      `You can not create marker, activate option first`,
      "topRight"
    );
    console.log("No puedes crear puntos primero activa la opcion");
  }

  //console.log(markers);
});

setTimeout(function () {
  console.log(db.pointsList);
  map.renderAllPointsSaved(db.pointsList);
  const markers = map.getAllMarkers();
  console.log(markers);

  markers.forEach((marker) => {
    marker.addListener("click", function () {
      renderAddress(marker, map);
      map.setCurrentMarketSelected(marker);
      console.log(map);
      //map.focusMarkerPosition();
    });
  });
}, 2000);

function getCoordsFromPosition(position) {
  const coords = position.coords;

  return coords;
}

function renderAddress(marker, map) {
  map.geocodeLatLng(marker, map);
  setTimeout(function () {
    map.openInfo(marker, map.getAddress(), map.getGoogleMap());

    map.renderPointInformation({
      address: $address,
      title: $titlePoint,
      marker: marker,
    });
  }, 300);
}

const $activatePointCreator = document.querySelector(".basic-component");
console.log($activatePointCreator);

document.querySelector("#create-marker").addEventListener("click", (event) => {
  console.log(event.target);

  const pointCreator = event.target;

  canCreatePoints = !canCreatePoints;
  map.setCanCreateMarker(canCreatePoints);

  if (!pointCreator.classList.contains("active")) {
    map.getGoogleMap().setOptions({ draggableCursor: "crosshair" });
  } else {
    map.getGoogleMap().setOptions({ draggableCursor: "" });
  }

  pointCreator.classList.toggle("active");
  console.log(canCreatePoints);
});

map.getGoogleMap().addListener("mousemove", () => {
  //document.getElementsByTagName("body")[0].style.cursor = "crosshair";
  //console.log($map);
});

let isVisible = true;

document.querySelector("#show-markers").addEventListener("click", (event) => {
  console.log(event.target);
  const markers = map.getAllMarkers();
  isVisible = !isVisible;
  markers.forEach((marker) => {
    marker.setVisible(isVisible);
  });

  console.log(markers);
});

document
  .getElementById("savePoint")
  .addEventListener("click", function (event) {
    event.preventDefault();
    console.log(event);

    createPoint({
      title: $titlePoint.value,
      lat: map.getCurrentMarketSelected().getPosition().lat(),
      lng: map.getCurrentMarketSelected().getPosition().lng(),
    });

    console.log(map.getCurrentMarketSelected().getPosition().lat());
    createAnNoty(
      "info",
      `The point with name ${$titlePoint.value} was saved`,
      "topRight"
    );
  });

function createPoint(point) {
  db.addData(point);
}

//google.maps.event.addDomListener(window, "load", map);

document.querySelector("#show-noty").addEventListener("click", (e) => {
  console.log("Show noty");

  createAnNoty("info", "The point was saved", "topRight");
});
