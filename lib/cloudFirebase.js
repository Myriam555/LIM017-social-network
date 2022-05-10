import {
  getFirestore, collection, addDoc, getDocs, onSnapshot,
  deleteDoc, doc, setDoc, getDoc, query, where, updateDoc, orderBy,
  arrayUnion, arrayRemove,
} from './imports/firebase-imports.js'; // conectar ,importar,mostrar
import { app } from './imports/firebase.js';

const db = getFirestore(app);

// para almacenar datos del usuario
export async function dataUser(id, name, email, password, urlPhotoUser, urlCoverPage) {
  try {
    const docRef = await setDoc(doc(db, 'dataUsers', id), {
      id, name, email, password, urlPhotoUser, urlCoverPage,
    });
    return docRef.id;
  } catch (e) {
    return e;
  }
}

export const getUser = (id) => getDoc(doc(db, 'dataUsers', id));// obtener informacion del usuario despues del login
export const getUsers = async () => getDocs(collection(db, 'dataUsers')); // obtener informacion de los usuarios  despues del login
export const onGetUser = (callback) => onSnapshot(query(collection(db, 'dataUsers')), callback);
export const updateDataUsers = (id, newFields) => updateDoc(doc(db, 'dataUsers', id), newFields); // actualizar publicación
/* PUBLICACIÓN */
export const dataPublication = (uid, title, text, date) => addDoc(collection(db, 'dataPublication'), {
  uid, title, text, date,
}); // para alamacenar datos de publicación
export const getPublication = () => getDocs(collection(db, 'dataPublication')); // obtener informacion
export const onGetPublication = (callback) => onSnapshot(query(collection(db, 'dataPublication'), orderBy('date', 'desc')), callback);// se agrega la publicación nueva sin recargar
export const onGetPublicationUser = (callback) => onSnapshot(query(collection(db, 'dataPublication'), where('uid', '==', sessionStorage.getItem('uid')), orderBy('date', 'desc')), callback); // se agrega la publicación nueva sin recargar POR USUARIO
export const deletePublication = (id) => deleteDoc(doc(db, 'dataPublication', id)); // eliminar publicación
export const getOnlyPublication = (id) => getDoc(doc(db, 'dataPublication', id)); // editar publicación
export const updatePublication = (id, newFields) => updateDoc(doc(db, 'dataPublication', id), newFields); // actualizar publicación

export const publicationLikeUnion = (id, uid) => setDoc(doc(db, 'dataPublication', id), { like: arrayUnion(uid) }, { merge: true });
export const publicationLikeRemove = (id, uid) => setDoc(doc(db, 'dataPublication', id), { like: arrayRemove(uid) }, { merge: true });
export const publicationLoveUnion = (id, uid) => setDoc(doc(db, 'dataPublication', id), { love: arrayUnion(uid) }, { merge: true });
export const publicationLoveRemove = (id, uid) => setDoc(doc(db, 'dataPublication', id), { love: arrayRemove(uid) }, { merge: true });
/* FUNCIONES DE LIKE Y LOVE */
export async function likePublication(id) {
  try {
    let docRef;
    const like = await getOnlyPublication(id);
    if (!like.data().like) {
      docRef = await publicationLikeUnion(id, sessionStorage.getItem('uid'));
    } else if (like.data().like.find((e) => e === sessionStorage.getItem('uid'))) {
      docRef = await publicationLikeRemove(id, sessionStorage.getItem('uid'));
    } else {
      // eslint-disable-next-line no-unused-vars
      docRef = await publicationLikeUnion(id, sessionStorage.getItem('uid'));
    }
    return true;
  } catch (e) {
    return false;
  }
}

export async function lovePublication(id) {
  try {
    let docRef;
    const love = await getOnlyPublication(id);
    if (!love.data().love) {
      docRef = await publicationLoveUnion(id, sessionStorage.getItem('uid'));
    } else if (love.data().love.find((e) => e === sessionStorage.getItem('uid'))) {
      docRef = await publicationLoveRemove(id, sessionStorage.getItem('uid'));
    } else {
      // eslint-disable-next-line no-unused-vars
      docRef = await publicationLoveUnion(id, sessionStorage.getItem('uid'));
    }
    return true;
  } catch (e) {
    return false;
  }
}
