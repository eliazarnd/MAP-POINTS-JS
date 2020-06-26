import Authenticate from "./auth-firebase.js";

import FireStoreDb from "./fireStore.js";

const authenticate = new Authenticate();

let elemen, instance;

document.addEventListener("DOMContentLoaded", function () {
  elemen = document.querySelectorAll(".modal");
  console.log(elemen);
  instance = M.Modal.init(elemen, {});
  console.log(instance);
});

const signInForm = document.getElementById("signInForm");
const logInForm = document.getElementById("logInForm");

document.getElementById("btnSignInAction").addEventListener("click", (e) => {
  console.log(signInForm);

  const email = signInForm.email.value;
  const password = signInForm.password.value;

  const user = {
    email,
    password,
  };
  authenticate.signInNewUser(user);
  console.log(instance);
  instance[0].close();

  console.log(user);
});

document.getElementById("btnLogInAction").addEventListener("click", (e) => {
  console.log(logInForm);

  const email = signInForm.email.value;
  const password = signInForm.password.value;
  const user = {
    email,
    password,
  };
  authenticate.logInUser(user);
  instance[1].close();
});

document.getElementById("btnLogInWithGoogle").addEventListener("click", (e) => {
  console.log(logInForm);

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  authenticate.logInWithProvider(googleProvider);

  instance[1].close();
});

document.getElementById("btnLogOut").addEventListener("click", (e) => {
  authenticate.logOutUser();
});
