import $ from "jquery";

import { db } from "./firebase"
import "./notification"


$( "#chatButton" ).click(function() {
  var str = $("#chatInput").val();
  if (str) {
    db.collection('messages').add({text: str, user: "Lucas", date: new Date()})
  }
  $("#chatInput").val("")
});

db.collection('messages').orderBy("date").onSnapshot((data)=>{
  $('#chatList').empty()
  data.docs.forEach((doc)=>{
    $('#chatList').append(`<div id="chatText">${doc.data().text}</div>`);
  })
})
