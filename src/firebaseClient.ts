import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  DocumentData,
  CollectionReference,
} from 'firebase/firestore';
import {getDatabase, connectDatabaseEmulator} from "firebase/database";
import { BoardProps } from './types';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SEND_APP,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(config);

export const firestore = getFirestore(app);
export const database = getDatabase(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

export const boardsCol = createCollection<BoardProps>('boards');

if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectDatabaseEmulator(database, "localhost", 9000);
}

export default app;
