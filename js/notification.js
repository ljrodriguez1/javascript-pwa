// import {db, firebase} from './firebase';

// const messaging = firebase.messaging();

messaging.getToken({
    vapidKey: 'BKYPTjqCHiB7E-smNWiaz8ktJ84yJepq8O6c0v5bvHZfPc88lmVV1fZRcwxwiiZsyNjH6WgZUlEUTMCO-2DVy_w',
    serviceWorkerRegistration: "service-worker.js" }).then(
      (token) => {
          if (token) {
            console.log("SEND TOKEN TO FIRESTORE")
            sendSubscriptionIDToFirestore(token)
          }
          else {
            console.log('No registration token available. Request permission to generate one.');
          }
      }
  ).catch( (error) => {
  console.log(error)
})

function sendSubscriptionIDToFirestore(token) {
    console.log("Subscription ID", token);
    // Send here to firestore
}

// //---extract the subscription id and send it over to the REST service---
// function removeSubscriptionIDFromFirestore(token) {
//     console.log("Subscription ID", token);
//     // Send here to firestore
// }
