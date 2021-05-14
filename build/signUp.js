submit_signpu = document.getElementById('signup')

submit_signup.addEventListener('click', check_signup())

function check_signup() {
    console.log("ACA?")
    email = document.getElementById('exampleInputEmail1')
    password = document.getElementById('exampleInputPassword1')

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