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

exports.setupNewUser = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Something went wrong'
    );
  }
  const uid = context.auth.uid;
  const email = context.auth.token.email;
  const name = data.name;

  const boardsRef = admin.database().ref('boards');
  const newBoardRef = await boardsRef.push({
    user_id: uid,
  });
  newBoardRef.update({
    id: newBoardRef.key
  })

  const newUserRef = admin.database().ref(`users/${uid}`);
  await newUserRef.update({
    board_id: newBoardRef.key,
    uid: uid,
    email: email,
    name: name,
  });

  return {
    status: 'success',
  };
});
