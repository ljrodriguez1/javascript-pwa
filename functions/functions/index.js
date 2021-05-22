const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.messageNotification = functions.firestore.document('groups/{groupId}/messages/{messageId}').onCreate(async (snap, context) => {
  const messageId = snap.data().userId
  functions.logger.info(messageId, {structuredData: true});

  await db.collection('users').get().then(async (data)=>{
    const tokens = []
    data.docs.forEach((doc)=>{
      const token = doc.data().token
      const id = doc.id
      functions.logger.info(id, {structuredData: true});
      if (token && messageId != id) {
        tokens.push(token)
      }
    })

    const message = {
      notification: {
        title: `Nuevo mensaje de ${snap.data().user}`,
        body: snap.data().text
      },
      tokens: tokens
    }
  
    // Send a message to devices subscribed to the provided topic.
    if (tokens.length != 0) {
      await admin.messaging().sendMulticast(message)
      .then((response) => {
        // Response is a message ID string.
      })
      .catch((error) => {
        functions.logger.error(error, {structuredData: true});
      });
    }
  })
})