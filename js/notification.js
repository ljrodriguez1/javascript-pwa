import {db, firebase} from './firebase';

const messaging = firebase.messaging();

messaging.requestPermission().then(function () {
    console.log('Have Permission');
    return messaging.getToken({ vapidKey: 'BKYPTjqCHiB7E-smNWiaz8ktJ84yJepq8O6c0v5bvHZfPc88lmVV1fZRcwxwiiZsyNjH6WgZUlEUTMCO-2DVy_w' });
  }.then(
      (token) => {
          if (token) {
            console.log("SEND TOKEN TO FIRESTORE")
            sendSubscriptionIDToFirestore(token)
          }
          else {
            console.log('No registration token available. Request permission to generate one.');
          }
      }
  )
). catch( (error) => {
  console.log(error)
})

// //---Update the Push Notification Status---
// function updatePushNotificationStatus(status) {
//     pushElement.dataset.checked = status;
//   }
  
// function checkIfPushIsEnabled() {
// //---check if push notification permission has been denied by the user---
// if (Notification.permission === 'denied') {
//     console.log('User has blocked push notification.');
//     return;
// }
// //---check if push notification is supported or not---
// if (!('PushManager' in window)) {
//     console.log('Sorry, Push notification is not supported on this browser.');
//     return;
// }
// //---get push notification subscription if serviceWorker is registered and ready---
// navigator.serviceWorker.ready
// .then(function (registration) {
//     registration.pushManager.getSubscription()
//     .then(function (subscription) {
//         console.log("SUSCRIPCION", subscription)
//         if (subscription) {
//             //---user is currently subscribed to push---
//         updatePushNotificationStatus(true);
//         }
//         else {
//             //---user is not subscribed to push---
//             updatePushNotificationStatus(false);
//         }
//     })
//     .catch(function (error) {
//         console.error('Error occurred enabling push ', error);
//     });
// });
// }

// console.log("WOWWWW")

// //---check if push notification is supported---
// checkIfPushIsEnabled()

// function sendSubscriptionIDToFirestore(token) {
//     console.log("Subscription ID", token);
//     // Send here to firestore
// }

// //---extract the subscription id and send it over to the REST service---
// function removeSubscriptionIDFromFirestore(token) {
//     console.log("Subscription ID", token);
//     // Send here to firestore
// }

// //---subscribe to push notification---
// function subscribeToPushNotification() {
//     navigator.serviceWorker.ready
//     .then(function(registration) {
//         if (!registration.pushManager) {
//             console.log('This browser does not support push notification.');
//             return false;
//         }
//         //---to subscribe push notification using pushmanager---
//         registration.pushManager.subscribe(
//             //---always show notification when received---
//             { userVisibleOnly: true }
//         )
//         .then(function (subscription) {
//             console.log('Push notification subscribed.');
//             console.log(subscription);
//             //------add the following statement------
//             sendSubscriptionIDToFirestore(subscription);
//            //---------------------------------------
//            updatePushNotificationStatus(true);
//         })
//         .catch(function (error) {
//             updatePushNotificationStatus(false);
//             console.error('Push notification subscription error: ', error);
//          });
//     })
// }

// //---unsubscribe from push notification---
// function unsubscribeFromPushNotification() {
//     navigator.serviceWorker.ready
//     .then(function(registration) {
//         registration.pushManager.getSubscription()
//         .then(function (subscription) {
//             if(!subscription) {
//                 alert('Unable to unsubscribe from push notification.');
//                 return;
//             }
//             subscription.unsubscribe()
//             .then(function () {
//                 console.log('Push notification unsubscribed.');
//                 console.log(subscription);
//                 //--------add the following statement--------
//                 removeSubscriptionIDFromFirestore(subscription);
//                 //-------------------------------------------
//                 updatePushNotificationStatus(false);
//             })
//             .catch(function (error) {
//                 console.error(error);
//             });
//         })
//         .catch(function (error) {
//             console.error('Failed to unsubscribe push notification.');
//         });
//     })
// }