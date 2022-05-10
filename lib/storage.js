/* eslint-disable no-unused-vars */
import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
} from './imports/firebase-imports.js';
// eslint-disable-next-line object-curly-spacing
import {updateDataUsers} from './cloudFirebase.js';

const storage = getStorage();

// funcion para descargar la foto del usuario
export async function dowloadImagePhoto(image) {
  let urlImage = '';
  await getDownloadURL(ref(storage, `foto-user/${image}`))
    .then((url) => {
      urlImage = url;
      updateDataUsers(sessionStorage.getItem('uid'), {
        urlPhotoUser: url,
      });
      sessionStorage.setItem('photoUser', url);
    }).catch((error) => {
    });
  return urlImage;
}
// funcion para subir la foto del usuario al storage
export async function photoUser(photo, div) {
  let result = '';
  const photoRef = ref(storage, `foto-user/${photo.name}`);
  const upload = await uploadBytesResumable(photoRef, photo);
  function time() {
    // eslint-disable-next-line no-param-reassign
    div.display = 'none';
  }
  if (upload.state === 'success') {
    setTimeout(time, 500);
  }
  result = true;
  await dowloadImagePhoto(photo.name, div);
  return result;
}

// funcion para descargar la foto de la portada del usuario
export async function dowloadCoverPage(image) {
  let urlImage = '';
  await getDownloadURL(ref(storage, `portada-user/${image}`))
    .then((url) => {
      urlImage = url;
      updateDataUsers(sessionStorage.getItem('uid'), {
        urlCoverPage: url,
      });
    }).catch((error) => {
    });
  return urlImage;
}
// funcion para subir la foto de portada del usuario al storage
export async function coverPageUser(coverPage, div) {
  let result = '';
  const coverPageRef = ref(storage, `portada-user/${coverPage.name}`);
  const upload = await uploadBytesResumable(coverPageRef, coverPage);
  function time() {
    // eslint-disable-next-line no-param-reassign
    div.display = 'none';
  }
  if (upload.state === 'success') {
    setTimeout(time, 500);
  }
  result = true;
  await dowloadCoverPage(coverPage.name);
  return result;
}

// funcion para descargar la imagen del storage a la publicación
async function dowloadImage(imagePreview, image) {
  await getDownloadURL(ref(storage, `image-publication/${image}`))
    .then((url) => {
      imagePreview.setAttribute('src', url);
    }).catch((error) => {
    });
}
// funcion para subir la imagen de la publicación al storage
export async function publicationUser(image, imagePreview, logoChange) {
  let result = '';
  const publicationRef = ref(storage, `image-publication/${image.name}`);
  const upload = await uploadBytesResumable(publicationRef, image);
  function time() {
    // eslint-disable-next-line no-param-reassign
    logoChange.display = 'none';
  }
  if (upload.state === 'success') {
    setTimeout(time, 500);
  }
  result = true;
  await dowloadImage(imagePreview, image.name);
  return result;
}
