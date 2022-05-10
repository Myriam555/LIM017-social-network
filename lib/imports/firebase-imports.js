// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js';
/* eslint-disable import/no-unresolved */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, signOut,
  updatePassword, onAuthStateChanged, sendPasswordResetEmail,
// eslint-disable-next-line import/no-relative-packages
} from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js';

/* CLOUD FIRESTORE */
import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc,
  doc, setDoc, getDoc, query, where, updateDoc, orderBy,
  arrayUnion, arrayRemove,
// eslint-disable-next-line import/no-relative-packages
} from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js'; // conectar ,importar,mostrar

import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js';

/* AUTH */
export {
  initializeApp, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, signOut,
  updatePassword, onAuthStateChanged, sendPasswordResetEmail,
};
/* CLOUD FIRESTORE */
export {
  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc,
  doc, setDoc, getDoc, query, where, updateDoc, orderBy,
  arrayUnion, arrayRemove,
};

/* STORAGE */
export {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
};
