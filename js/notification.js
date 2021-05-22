import {db, messaging} from './firebase';

// const messaging = firebase.messaging();

messaging
 .requestPermission()
 .then(function () {
    console.log("Notification permission granted4.");
 })
 .catch(function (err) {
    console.log("Unable to get permission to notify.", err);
  });

messaging.onMessage((payload)=>{
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  if (notificationTitle) {
    window.alert(notificationTitle+ ": " +notificationOptions.body);
  }
})



export function sendSubscriptionIDToFirestore(userId) {  
  messaging.getToken({
    vapidKey: 'BKYPTjqCHiB7E-smNWiaz8ktJ84yJepq8O6c0v5bvHZfPc88lmVV1fZRcwxwiiZsyNjH6WgZUlEUTMCO-2DVy_w'}).then(
      (token) => {
          if (token) {
            db.collection('users').doc(userId).set({token}, {merge: true})
          }
          else {
            console.log('No registration token available. Request permission to generate one.');
          }
      }
  ).catch( (error) => {
  console.log(error)
  })
}

// //---extract the subscription id and send it over to the REST service---
// function removeSubscriptionIDFromFirestore(token) {
//     console.log("Subscription ID", token);
//     // Send here to firestore
// }