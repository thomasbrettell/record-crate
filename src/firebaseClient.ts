import { initializeApp } from 'firebase/app';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SEND_APP,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(config);

export const database = getDatabase(app);
export const auth = getAuth(app);

if (
  window.location.hostname === 'localhost' &&
  process.env.REACT_APP_ENV === 'local'
) {
  connectDatabaseEmulator(database, 'localhost', 9000);
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
}

export default app;
