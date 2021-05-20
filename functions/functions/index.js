const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});

  const token = "cmfu1us3JIIP0hTHUVK5VN:APA91bHvzXngYoLlC8BklD0VnuXZ9biAl1LfCOfh7sZv8znLJsjSHH-6TueOfxIiJMa-bimAMuV2jU2eOsEDpEL9Ujt63EQMXc4EwfJI7oJoaIK2LP0qLpwNZ9f0R4HaB2_N6RcoeSwP"

  const message = {
    notification: {
      title: '$FooCorp up 1.43% on the day',
      body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.'
    },
    token: token,
  };

// Send a message to devices subscribed to the provided topic.
  await admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    response.send("Correct Notification!");
  })
  .catch((error) => {
    response.send('Invalid Notification', error);
  });
});
