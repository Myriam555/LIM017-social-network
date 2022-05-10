export const initializeApp = () => Promise.resolve({});
export const getAuth = () => {};
/* CREAR USUARIO */
export const createUserWithEmailAndPassword = (auth, email, password) => {
  const regexEmail = /([\da-z_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
  const emailE = 'prueba@gmail.com';
  if (regexEmail.test(email) && password.length >= 6) {
    const userCredentials = {
      user: { uid: 'xyxyui123' },
    };
    return Promise.resolve(userCredentials);
  }
  if (!regexEmail.test(email) && !password) {
    const error = {
      code: 'auth/invalid',
    };
    return Promise.reject(error);
  }
  if (email === emailE) {
    const error = {
      code: 'auth/email-already-in-use',
    };
    return Promise.reject(error);
  }
  if (!regexEmail.test(email)) {
    const error = {
      code: 'auth/invalid-email',
    };
    return Promise.reject(error);
  }
  if (password.length < 6) {
    const error = {
      code: 'auth/weak-password',
    };
    return Promise.reject(error);
  }
  return false;
};
/* INGRESAR CON EMAIL Y PASSWORD */
export const signInWithEmailAndPassword = jest.fn((auth, email, password) => {
  if (email && password) {
    const userCredential = {
      user: { uid: 'xyxyui123' },
    };
    return Promise.resolve(userCredential);
  } const error = 'error';
  return Promise.reject(error);
});
/* ACCES USER WITH GOOGLE */
export const GoogleAuthProvider = jest.fn(() => {});
export const signInWithPopup = jest.fn(() => {
  const result = {
    user: {
      displayName: 'Paola',
      uid: 'hni12345',
      email: 'paola@gmail.com',
      accessToken: 'YYWWXX',
    },
  };
  return Promise.resolve(result);
});
/* OLVIDO DE CONTRASEÑA */
export const sendPasswordResetEmail = jest.fn(() => Promise.resolve({}));
/* CAMBIAR CONTRASEÑA PASSWORD */
export const updatePassword = () => Promise.resolve({});
export const onAuthStateChanged = () => Promise.resolve({});
/* CERRAR SESIÓN */
export const signOut = () => Promise.resolve({});
/* CLOUDFIREBASE */
export const setDoc = (id) => {
  if (id.dataUsers || id.dataPublication) {
    return Promise.resolve({ id: 'id' });
  } const error = 'error';
  return Promise.resolve(error);
};
export const db = jest.fn();
export const collection = jest.fn((_db_, _collection_) => _collection_);
export const getDocs = jest.fn(() => Promise.resolve({
  data: {
    id: 'xxxxxyyyyzzzz',
  },
  forEach: () => ([{ data: { id: 'xxxxxyyyyzzzz' } }]),
}));
export const addDoc = () => Promise.resolve({});
export const onSnapshot = jest.fn(() => Promise.resolve([{ id: 'id' }]));
export const orderBy = () => Promise.resolve({});
export const query = () => Promise.resolve({});
export const where = () => Promise.resolve({});
export const updateDoc = () => Promise.resolve({});
export const getDoc = jest.fn((id) => {
  let date = '';
  if (id.dataPublication) {
    date = {
      data: () => ({
        id: 'xxxxxyyyyzzzz',
        uid: 'xxxxxyyyyzzzz',
        like: [id],
        love: [id],
      }),
    };
  } else if (id === 'hni12345') {
    date = {
      data: () => ({
        id: 'xxxxxyyyyzzzz',
        uid: 'xxxxxyyyyzzzz',
      }),
      exists: () => true,
    };
  } else {
    date = {
      data: () => ({
        id: 'xxxxxyyyyzzzz',
        uid: 'xxxxxyyyyzzzz',
      }),
      exists: () => false,
    };
  }
  return Promise.resolve(date);
});
export const getFirestore = () => Promise.resolve({});
export const deleteDoc = jest.fn(() => { });
// export const doc = () => Promise.resolve({});
export const doc = jest.fn((_db_, col, id) => Object({
  [col]: id,
}));
export const arrayUnion = () => Promise.resolve({});
export const arrayRemove = () => Promise.resolve({});

/* STORAGE */
export const getStorage = () => Promise.resolve({});
export const ref = (storage, photoUrl) => (photoUrl.includes('exist') ? 'urlPhoto' : '');
export const uploadBytesResumable = () => Promise.resolve({ state: 'success' });
// eslint-disable-next-line prefer-promise-reject-errors
export const getDownloadURL = (photoName) => (photoName === '' ? Promise.reject('Photo not exists') : Promise.resolve('urlPhoto'));
