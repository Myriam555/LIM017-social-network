/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/no-cycle
import { headerTemplate } from './Header.js';
// eslint-disable-next-line import/no-cycle
import { publicationBeforeTemplate } from './PublicationBefore.js';
import {
  // eslint-disable-next-line max-len
  onGetPublicationUser, onGetUser, likePublication, lovePublication,
} from '../lib/cloudFirebase.js';
import { photoUser, coverPageUser } from '../lib/storage.js';
import {
  buttonEditMain, deletePublicationWithMessage, hideShowDivUploader, uploaderImagePublication,
  createPublicationProfile, createPhotoCoverPage,
} from '../lib/functionComponents.js';

export const Profile = () => {
  const profileContainer = document.createElement('div');
  profileContainer.className = 'container-feed'; // contenedor general
  profileContainer.id = 'containerProfile';
  const divChangeImageDisplay = document.createElement('div');
  divChangeImageDisplay.style.display = 'none';
  divChangeImageDisplay.id = 'divChangeImageDisplay';
  const divChangeImage = document.createElement('div');
  divChangeImage.className = 'div-logo-change-image';
  const logoChange = document.createElement('img');
  logoChange.src = '../img/cargando.gif';
  logoChange.alt = 'gif de cargando';
  const mainTemplate = document.createElement('main');
  mainTemplate.className = 'container-publication';
  const coverPagePhotoContainer = document.createElement('div');
  coverPagePhotoContainer.className = 'container-coverpage-Photo';
  divChangeImageDisplay.appendChild(divChangeImage);
  divChangeImage.appendChild(logoChange);
  // FOTO DE PORTADA Y FOTO DEL USUARIO EN GRANDE
  onGetUser((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc2) => {
      const profileNew = doc2.data(); // dato de todos los usuarios
      if (profileNew.id === sessionStorage.getItem('uid')) {
        html += createPhotoCoverPage(profileNew);
      }
    });
    coverPagePhotoContainer.innerHTML = html;
    const imageUploaderPhoto = coverPagePhotoContainer.querySelector('#imgUploaderphoto');
    const imageUploaderCover = coverPagePhotoContainer.querySelector('#imgUploaderPortada');

    // AÑADIENDO FUNCIONALIDAD PARA PONER LA FOTO DEL USUARIO EN EL PROFILE
    imageUploaderPhoto.addEventListener('change', (e) => {
      const file = e.target.files[0]; // url de la foto
      divChangeImageDisplay.style.display = 'block';
      photoUser(file, divChangeImageDisplay.style);
    });
    imageUploaderCover.addEventListener('change', (e) => {
      const file = e.target.files[0]; // url de la foto
      divChangeImageDisplay.style.display = 'block';
      coverPageUser(file, divChangeImageDisplay.style);
    });
  });
  // PUBLICACIONES SOLO DEL USUARIO
  onGetPublicationUser((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc2) => {
      const publicationNew = doc2.data();
      html += createPublicationProfile(publicationNew, doc2);
    });
    mainTemplate.innerHTML = html;
    // AGREGANDO FUNCIONALIDAD DE IMAGENES
    const buttonShareImage = mainTemplate.querySelectorAll('.share-image-logo');
    // EVENTO PARA PUBLICAR FOTO
    buttonShareImage.forEach((btnImage) => {
      const sectionPublication = btnImage.parentNode.parentNode;
      const buttonShare = sectionPublication.querySelector('.share-image-logo');
      buttonShare.id = 'buttonShare';
      hideShowDivUploader(sectionPublication); // FUNCIÓN PARA MOSTRAR Y OCULTAR CONTENEDOR DE FOTOS
      uploaderImagePublication(sectionPublication); // FUNCIÓN PARA PUBLICAR FOTO
    });
    // LIKE A PUBLICACIONES
    const buttonLike = mainTemplate.querySelectorAll('.btnlike');
    buttonLike.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        likePublication(dataset.id);
      });
    });
    // LOVE A PUBLICACIONES
    const buttonLove = mainTemplate.querySelectorAll('.btnlove');
    buttonLove.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        lovePublication(dataset.id);
      });
    });
    // ELIMINANDO PUBLICACIONES
    const buttonDelete = mainTemplate.querySelectorAll('.share-trash-logo');
    buttonDelete.forEach((btn) => {
      const sectionPublication = btn.parentNode.parentNode.parentNode;
      deletePublicationWithMessage(sectionPublication);
    });
    // EDITANDO PUBLICACIONES
    const buttonEdit = mainTemplate.querySelectorAll('.share-edit-logo');
    buttonEditMain(buttonEdit);
  });
  profileContainer.appendChild(divChangeImageDisplay);
  profileContainer.appendChild(headerTemplate());
  profileContainer.appendChild(coverPagePhotoContainer);
  profileContainer.appendChild(publicationBeforeTemplate());
  profileContainer.appendChild(mainTemplate);

  return profileContainer;
};
