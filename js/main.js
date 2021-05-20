import $ from "jquery";

import {db, check_signup, sign_out, current_user, sign_in } from "./firebase"


$( "#chatButton" ).click(function() {
  console.log("DALEE")
  var str = $("#chatInput").val();
  if (str) {
    let user = current_user();
    console.log("VEAMOS", user)
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
  if (user !==  null){
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
  let email = $( "#exampleInputEmail" ).val()
  let password = $( "#exampleInputPassword" ).val()
  console.log("EMAIL", email)
  console.log("password", password)
  const user = sign_in(email, password)
  if (user !==  null){
    db.collection('users').doc(user.uid).collection('messages').orderBy("date").onSnapshot((data)=>{
      $('#chatList').empty()
      data.docs.forEach((doc)=>{
        $('#chatList').append(`<div id="chatText">${doc.data().text}</div>`);
      })
    })
    location.href = "http://localhost:9000/main_page.html";
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
