import { firebase } from './firebase'

function check_signup(email, password) {
  const user = firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
      const user = userCredential.user;
      return user
  })
  .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("MALO", errorCode, errorMessage)
      return null
  });
  return user
}

function current_user() {
  var user = firebase.auth().currentUser
  if (user) {
    // User is signed in.
    return user
  } else {
    // No user is signed in.
    return null
  }
}

/////////////////////////////

function sign_in(email, password){
  const user = firebase.auth().signInWithEmailAndPassword(email, password).then(
    function(user){
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
  const nose = await firebase.auth().signOut().then(() => {
    return true
  }).catch((error) => {
    return false
  });
  return nose
}

export {check_signup, sign_in, sign_out, current_user}