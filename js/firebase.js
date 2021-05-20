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

if (firebase.apps.length === 0) {
  console.log("WII")
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
/////////////////////////////
function check_signup(email, password) {
  console.log(firebase)
  console.log("EMAIL", email)
  console.log("PASSWORD", password)
  const user = firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
      // Signed inxs
      console.log("????")
      var user = userCredential.user;
      console.log("YEY")
      console.log(user)
      return user
      // ...
  })
  .catch((error) => {
      console.log("DALEEEE")
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("MALO", errorCode, errorMessage)
      return null
      // ..
  });
  const user2 = current_user();
  console.log(typeof user2)
  console.log("$", user2)
  console.log("????")
  console.log(user.uid)
  console.log("NO DEBERIA SER ACA")
  return user
}
/////////////////////////////


//function current_user() {
//
//  firebase.auth().onAuthStateChanged(function(user) {
//    if (user) {
//      // User is signed in.
//      let user_id = user.uid
//      console.log("ID", user_id)
//      return user
//    } else {
//      // No user is signed in.
//      console.log("NOBODY IS SIGNED IN")
//      return null
//    }
//  });
//}

function current_user() {
  var user = firebase.auth().currentUser
  if (user) {
    // User is signed in.
    return user
  } else {
    // No user is signed in.
    console.log("NOBODY HERE")
  }
}

/////////////////////////////

function sign_in(email, password){
  const user = firebase.auth().signInWithEmailAndPassword(email, password).then(
    function(user){
      console.log("HAY USUARIO")
      console.log(user)
      return user;

    }
  ).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    return null;
});
return user;

}

/////////////////////////////

async function sign_out() {
  console.log("OUTTT")
  const nose = await firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("??!!")
    return true
  }).catch((error) => {
    // An error happened.
    console.log("EEOR", error)
    return false
  });
  console.log("VEAMOS EL ONOSE", nose)
  return nose
}

/////////////////////////////


export {db, check_signup, sign_out, sign_in, current_user, firebase};
