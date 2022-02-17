import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

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
  const slug = name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  const boardsRef = admin.database().ref('boards');
  const newBoardRef = await boardsRef.push({
    user_id: uid,
    slug: slug,
  });
  newBoardRef.update({
    id: newBoardRef.key,
  });

  const newUserRef = admin.database().ref(`users/${uid}`);
  await newUserRef.update({
    board_id: newBoardRef.key,
    uid: uid,
    email: email,
    name: name,
    slug: slug,
  });

  return {
    status: 'success',
    slug: slug,
  };
});
