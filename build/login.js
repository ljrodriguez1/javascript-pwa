
submit_login = document.getElementById('logIn')

submit_login.addEventListener('click', check_login())

function check_login() {
    email = document.getElementById('exampleInputEmail')
    password = document.getElementById('exampleInputPassword')

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