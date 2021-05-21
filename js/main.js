import $ from "jquery";

import {db, check_signup, sign_out, current_user, sign_in, firebase } from "./firebase"


$( "#chatButton" ).click(function() {
  console.log("DALEE")
  var str = $("#chatInput").val();
  if (str) {
    let user = current_user();
    console.log("VEAMOS", user.uid) // eso es lo que queremos
    // db.collection('messages').add({text: str, user: "Lucas", date: new Date()})
    if (user !== null){
      db.collection('users').doc(user.uid).collection('messages').add({text: str, user: "Lucas", date: new Date()})
    } else {
      console.log("NOT USER SIGN IN")
    }
  }
  $("#chatInput").val("")
});

$( "#signup" ).click(function() {
  console.log("YAPO CTM")
  console.log("YAPO CTM")
  let email = $( "#exampleInputEmail1" ).val()
  let password = $( "#exampleInputPassword1" ).val()
  console.log("EMAIL", email)
  console.log("password", password)
  const user = check_signup(email, password)
  if (user.email){
    db.collection('users').doc(user.uid).collection('messages').orderBy("date").onSnapshot((data)=>{
      $('#chatList').empty()
      data.docs.forEach((doc)=>{
        $('#chatList').append(`<div id="chatText">${doc.data().text}</div>`);
      })
    })
    location.href = "http://localhost:9000/main_page.html";
  }
})

$( "#signin" ).click(function() {
  console.log("YAPO CTM3")
  console.log("YAPO CTM3")
  let email = $( "#exampleInputEmail2" ).val()
  let password = $( "#exampleInputPassword2" ).val()
  console.log("EMAIL", email)
  console.log("password", password)
  const user = sign_in(email, password)
  console.log(user)
  if (user.email){
    db.collection('users').doc(user.uid).collection('messages').orderBy("date").onSnapshot((data)=>{
      $('#chatList').empty()
      data.docs.forEach((doc)=>{
        $('#chatList').append(`<div id="chatText">${doc.data().text}</div>`);
      })
    })
  }
})

$( "#sign-out" ).click(function() {
  console.log("YAPO CTM2")
  console.log("YAPO CTM2")
  if (sign_out()){
    location.href = 'http://localhost:9000'
  } else{
    console.log("PROBLEMAS CON SIGN OUT")
  }
})

firebase.auth().onAuthStateChanged(function(user) {
  console.log("EL USER", user)
  if (user) {
    // User is signed in.
    console.log("WOWW")
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    if (location.href != "http://localhost:9000/main_page.html") {
      location.href = "http://localhost:9000/main_page.html"
    }
    // ...
  } else {
    console.log("SIGNED OUT")
    if (location.href !== "http://localhost:9000/") {
      // location.href = "http://localhost:9000"
    }
    // User is signed out.
    // ...
  }
});