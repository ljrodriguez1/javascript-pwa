import $ from "jquery";

import {db, firebase } from "./firebase"
import {check_signup, sign_out, current_user, sign_in} from './auth' 
import { sendSubscriptionIDToFirestore } from './notification'
import "./notification"

const prod = 'https://pwaeich.surge.sh'
const dev = 'http://localhost:9000'


$( "#chatButton" ).click(function() {
  console.log("DALEE")
  var str = $("#chatInput").val();
  if (str) {
    let user = current_user();
    console.log("VEAMOS", user.uid) // eso es lo que queremos
    // db.collection('messages').add({text: str, user: "Lucas", date: new Date()})
    if (user !== null){
      db.collection('groups').doc('123456789').collection('messages').add({text: str, user: user.email, date: new Date(), userId: user.uid})
    } else {
      console.log("NOT USER SIGN IN")
    }
  }
  $("#chatInput").val("")
});

$( "#signup" ).click(function() {
  let email = $( "#exampleInputEmail1" ).val()
  let password = $( "#exampleInputPassword1" ).val()
  const user = check_signup(email, password)
})

$( "#signin" ).click(function() {
  let email = $( "#exampleInputEmail2" ).val()
  let password = $( "#exampleInputPassword2" ).val()
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
  sign_out()
})

firebase.auth().onAuthStateChanged(function(user) {
  const url = prod
  console.log("EL USER", user)
  let unsubscribe = false
  if (user) {
    var email = user.email;
    var uid = user.uid;
    db.collection('users').doc(uid).set({email}, {merge: true})
    sendSubscriptionIDToFirestore(uid)
    unsubscribe = db.collection('groups').doc('123456789').collection('messages').orderBy("date").onSnapshot((data)=>{
      $('#chatList').empty()
      data.docs.forEach((doc)=>{
        $('#chatList').append(`<div id="chatText">${doc.data().text}</div>`);
      })
    })
    if (location.href != url + "/main_page.html") {
      location.href = url + "/main_page.html"
    }
    // ...
  } else {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = false
    }

    if (location.href !== url + "/") {
      location.href = url
    }
    // User is signed out.
    // ...
  }
});