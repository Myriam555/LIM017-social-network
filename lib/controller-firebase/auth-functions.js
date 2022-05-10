/* eslint-disable no-unused-expressions */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
  GoogleAuthProvider, signOut,
  updatePassword, onAuthStateChanged, sendPasswordResetEmail,
} from '../imports/firebase-imports.js';
// eslint-disable-next-line import/no-cycle
import { returnLogin } from '../auth.js';

export const createUser = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      return uid;
    });
};

export const accesUserExist = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const credential = userCredential;
      return credential;
    });
};

export const signGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return (user);
    });
};

export const createNewPassword = (email) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};

export const closeSession = () => {
  const auth = getAuth();
  return signOut(auth);
};

export const validateCorrectPassword = (email, currentPassword) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, currentPassword);
};

export function updateNewPassword(user, newPassword) {
  return updatePassword(user, newPassword);
}

export const stateUser = (newPassword) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      updateNewPassword(user, newPassword);
    }
  });
};

export const verifyUserActive = () => {
  // eslint-disable-next-line no-shadow
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user === null) { // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      returnLogin();
    }
  });
};
