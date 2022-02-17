import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addMessage = functions.https.onCall((data, context) => {
  // Message text passed from the client.
  const text: string = data.text;
  // Authentication / user information is automatically added to the request.
  // const uid = context.auth.uid;
  // const name = context.auth.token.name || null;
  // const picture = context.auth.token.picture || null;
  // const email = context.auth.token.email || null;
  const sanitizedMessage = text.toUpperCase(); // Sanitize the message.

  return admin
    .database()
    .ref('/messages')
    .push({
      text: sanitizedMessage,
    })
    .then(() => {
      console.log('New Message written');
      // Returning the sanitized message to the client.
      return { text: sanitizedMessage };
    });
});
