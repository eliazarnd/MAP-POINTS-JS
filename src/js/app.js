import points from "./db.js";
import map from "./Map.js";

import createAnNoty from "./Noty/utilNoty.js";

import FireStoreDb from "./fireStore.js";

const fireStore = new FireStoreDb();

import "./firebase-config.js";

console.log(map);

//const db = new DataBase("Points");

//db.createDataBase();

const $address = document.querySelector(".address");
const $titlePoint = document.querySelector(".title-point");
const $btnDelete = document.querySelector(".btn-delete");
console.log($btnDelete);
let canCreatePoints = false;

let status = "";

//https://pngimg.com/uploads/gps/gps_PNG22.png

console.log(map);
//map.getGoogleMap().setVisible(false);

map.getGoogleMap().setTilt(45);

map.getGoogleMap().addListener("click", (eventMap) => {
  //console.log(map.getGoogleMap());
  console.log(points);

  if (currentUserLogged === null || currentUserLogged === undefined) {
    createAnNoty(
      "warning",
      `You can not interact with map, until you logged to the app`,
      "topRight"
    );
  }

  if (map.getCanCreateMarker() && currentUserLogged !== undefined) {
    status = "create";

    console.log(status);
    const marker = map.createMarker(eventMap.latLng);
    map.setCurrentMarketSelected(marker);
    renderAddress(marker, map);
    console.log(map);
    map.setCanCreateMarker(false);
    map.getGoogleMap().setOptions({ draggableCursor: "" });
    marker.addListener("click", (mark) => {
      renderAddress(marker, map);
      map.setCurrentMarketSelected(marker);
      status = "edit";
      console.log(map);
      console.log(status);
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

let currentUserLogged;

const $btnSignIn = document.getElementById("btnSignIn");
const $btnLogIn = document.getElementById("btnLogIn");

firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
    currentUserLogged = user;
    $btnSignIn.style.display = "none";
    $btnLogIn.style.display = "none";
    createAnNoty(
      "success",
      `Welcome to your map, ${
        currentUserLogged.displayName || currentUserLogged.email
      }`,
      "topRight"
    );

    console.log("El usuario esta logeado");
    console.log(user);
    // User is signed in.
    // var displayName = user.displayName;
    //var email = user.email;
    //var emailVerified = user.emailVerified;
    //var photoURL = user.photoURL;
    //var isAnonymous = user.isAnonymous;
    //var uid = user.uid;
    //var providerData = user.providerData;
    // ...

    const pointsForUser = await fireStore.getPointsForUser(
      currentUserLogged.uid
    );

    setTimeout(function () {
      map.renderAllPointsSaved(pointsForUser);
      const markers = map.getAllMarkers();
      console.log(markers);

      markers.forEach((marker) => {
        marker.addListener("click", function () {
          renderAddress(marker, map);
          map.setCurrentMarketSelected(marker);
          console.log(map);
          status = "edit";
          console.log(status);
          //map.focusMarkerPosition();
        });
      });
    }, 2000);
  } else {
    createAnNoty(
      "alert",
      `Good by, come soon ${
        currentUserLogged.displayName || currentUserLogged.email
      }`,
      "topRight"
    );
    console.log("El usuario esta deslogeado");
    // User is signed out.
    // ...
    currentUserLogged = null;
    const markers = map.getAllMarkers();

    markers.forEach((marker) => {
      marker.setVisible(false);
    });
    map.deleteMarkers();

    $btnSignIn.style.display = "block";
    $btnLogIn.style.display = "block";
  }
});

function getCoordsFromPosition(position) {
  const coords = position.coords;

  return coords;
}

function renderAddress(marker, map) {
  map.geocodeLatLng(marker, map);
  setTimeout(async function () {
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
  console.log(currentUserLogged);
  const markers = map.getAllMarkers();
  isVisible = !isVisible;
  markers.forEach((marker) => {
    marker.setVisible(isVisible);
  });

  console.log(markers);
});

document
  .getElementById("savePoint")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    console.log(event);

    let newPoint = {
      owner: currentUserLogged.uid,
      title: $titlePoint.value,
      lat: map.getCurrentMarketSelected().getPosition().lat(),
      lng: map.getCurrentMarketSelected().getPosition().lng(),
    };

    if (status === "edit") {
      fireStore.updateApoint(map.getCurrentMarketSelected().id, newPoint);
    } else {
      createPoint(newPoint);
      const point = await fireStore.getPointByTitle($titlePoint.value);

      map.getCurrentMarketSelected().id = point.id;

      console.log(map.getCurrentMarketSelected());
    }

    console.log(map.getCurrentMarketSelected().getPosition().lat());
    createAnNoty(
      "info",
      `The point with name ${$titlePoint.value} was saved`,
      "topRight"
    );
  });

$btnDelete.addEventListener("click", function (e) {
  console.log(map.currentMarketSelected.id);
  const pointId = map.currentMarketSelected.id;
  fireStore.deltePoint(pointId);
  createAnNoty(
    "error",
    `The point with name ${$titlePoint.value} was deleted`,
    "topRight"
  );
  map.currentMarketSelected.setVisible(false);
});

function createPoint(point) {
  //db.addData(point);
  fireStore.createAPoint(point);
}

//google.maps.event.addDomListener(window, "load", map);

document.querySelector("#show-noty").addEventListener("click", (e) => {
  console.log(currentUserLogged.uid);

  createAnNoty("info", "The point was saved", "topRight");
});
