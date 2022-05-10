/* eslint-disable import/no-unresolved */
import { initializeApp, getFirestore } from './firebase-imports.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCndNrEQqKW9lxejcf3Ksr3Zt3Q28Gtu2M',
  authDomain: 'social-network-programmers.firebaseapp.com',
  databaseURL: 'http://social-network-programmers.firebaseapp.com',
  projectId: 'social-network-programmers',
  storageBucket: 'gs://social-network-programmers.appspot.com/',
  messagingSenderId: '857295101335',
  appId: '1:857295101335:web:ebceaaef0a3194aa7ef8d2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
