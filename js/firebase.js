// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyD2eR7xpxrAOk320MjWSaQdu4_y2aVxA4s",
    authDomain: "pwa-reich.firebaseapp.com",
    databaseURL: "https://pwa-reich-default-rtdb.firebaseio.com",
    projectId: "pwa-reich",
    storageBucket: "pwa-reich.appspot.com",
    messagingSenderId: "213332410499",
    appId: "1:213332410499:web:3bdcfd4d86a53bf7919bb6"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
/////////////////////////////
function check_signup(email, password) {
  console.log("ACA?")

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("YEY")
      console.log(user)
      // ...
  })
  .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("MALO", errorCode, errorMessage)
      // ..
  });
}
/////////////////////////////


function check_login(email, password) {

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        document.getElementById('error').innerHTML= "Wrong password"
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
}

export {db, check_signup, check_login};