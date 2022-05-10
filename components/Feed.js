/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/no-cycle
import { headerTemplate } from './Header.js';
// eslint-disable-next-line import/no-cycle
import { publicationBeforeTemplate } from './PublicationBefore.js';
import {
  onGetPublication, likePublication, lovePublication, getUsers,
} from '../lib/cloudFirebase.js';
// eslint-disable-next-line import/named
import {
  buttonEditMain, deletePublicationWithMessage, hideShowDivUploader, uploaderImagePublication,
  createPublicationFeed,
} from '../lib/functionComponents.js';

export const Feed = () => {
  const divFeed = document.createElement('div');
  divFeed.className = 'container-feed'; // contenedor general
  const mainTemplate = document.createElement('main');
  mainTemplate.className = 'container-publication';
  mainTemplate.id = 'mainTemplate';
  onGetPublication(async (querySnapshot) => {
    let html = '';
    const allDataUser = await getUsers();
    const mapaDato = new Map();

    allDataUser.forEach((dataUser) => {
      mapaDato.set(`${dataUser.data().id}-photo`, dataUser.data().urlPhotoUser);
      mapaDato.set(`${dataUser.data().id}-name`, dataUser.data().name);
    });
    querySnapshot.forEach(async (doc2) => {
      const publicationNew = doc2.data();
      const photo = mapaDato.get(`${publicationNew.uid.toString()}-photo`);
      const name = mapaDato.get(`${publicationNew.uid.toString()}-name`);
      html += createPublicationFeed(publicationNew, doc2, photo, name);
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
  divFeed.appendChild(headerTemplate());
  divFeed.appendChild(publicationBeforeTemplate());
  divFeed.appendChild(mainTemplate);

  return divFeed;
};
