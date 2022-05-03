/* eslint-disable no-unused-expressions */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
  GoogleAuthProvider, /* FacebookAuthProvider, */ signOut,
  updatePassword, onAuthStateChanged, sendPasswordResetEmail,
} from '../imports/firebase-imports.js';
// eslint-disable-next-line import/no-cycle
import { returnLogin } from '../auth.js';
 // import { onNavigate } from '../../Router.js';

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

/* // AUTENTICACIÓN CON FB
const provider2 = new FacebookAuthProvider();

export function accesFacebook() {
  const auth = getAuth();
  console.log('holaaaaaaaaaaaaaaaaaaaaaaaaa antes del poput');
  console.log(auth);
  console.log(provider2);
  signInWithPopup(auth, provider2)
    .then((result) => {
      console.log('holaaaaaaaaaaaaaaaaaaaaaaaaa en el then ');
      // The signed-in user info.
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const user = result.user;
      console.log(accessToken, user);
      onNavigate('/feed');
    })
    .catch((error) => {
      console.log(auth);
      console.log(provider2);
      console.log('holaaaaaaaaaaaaaaaaaaaaaaaaa en el catch ');
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(credential, error);
    });
} */
