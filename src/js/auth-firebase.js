export default class Authenticate {
  signInNewUser({ email, password }) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });
  }

  logInUser({ email, password }) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem("logged", true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logOutUser() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.setItem("logged", false);
        console.log("Usuario deslogeado");
      });
  }

  logInWithProvider(provider) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        localStorage.setItem("logged", true);
        console.log("Logeado con la cuenta de google");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
