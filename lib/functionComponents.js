/* eslint-disable object-curly-newline */
/* eslint-disable no-nested-ternary */
import {
  deletePublication, getOnlyPublication, updatePublication,
} from './cloudFirebase.js';
// eslint-disable-next-line import/no-unresolved
import f from './functions.js';
import { publicationUser } from './storage.js';

/* FUNCIONES FEED */

// FUNCIONES PARA EDITAR PUBLICACIONES
export function filesShow(sectionPublication) {
  const areaTitle = sectionPublication.querySelector('.title-area');
  const areaText = sectionPublication.querySelector('.text-area');
  const imgUploader = sectionPublication.querySelector('.share-image-logo');
  const emoticon = sectionPublication.querySelector('.share-stickers-logo');
  const buttonSave = sectionPublication.querySelector('.btn-save');
  // activando contenedores
  areaTitle.contentEditable = true;
  areaText.contentEditable = true;
  emoticon.style.display = 'block';
  buttonSave.style.display = 'block';
  imgUploader.style.display = 'block';
}

export function filesHide(sectionPublication) {
  const emoticon = sectionPublication.querySelector('.share-stickers-logo');
  const buttonSave = sectionPublication.querySelector('.btn-save');
  const areaTitle = sectionPublication.querySelector('.title-area');
  const areaText = sectionPublication.querySelector('.text-area');
  emoticon.style.display = 'none';
  buttonSave.style.display = 'none';
  areaTitle.contentEditable = false;
  areaText.contentEditable = false;
  return true;
}

export function buttonSaveEdit(buttonSave, doc3, sectionPublication, id) {
  let titleNew = doc3.data().title;
  titleNew = sectionPublication.querySelector('#newTitle').innerHTML;
  let textNew = doc3.data().text;
  textNew = sectionPublication.querySelector('#newText').innerHTML;
  updatePublication(id, { // actualizando publicaciones
    title: titleNew,
    text: textNew,
  });
  filesHide(sectionPublication, buttonSave);
  return true;
}

export function createEmoticon(sectionPublication) {
  const divText = sectionPublication.querySelector('.text-area');
  const divEmoticons = sectionPublication.querySelector('.div-emoticons');
  // eslint-disable-next-line no-plusplus
  for (let index = 1; index < 82; index++) {
    const emoji = `img/emoji/emoji${index}.png`;
    const emojiIco = document.createElement('img');
    emojiIco.className = 'emoticons';
    emojiIco.src = emoji;
    emojiIco.id = 'emojiIco';
    emojiIco.addEventListener('click', () => {
      divText.focus();
      f.pasteHtmlAtCaret(`<img class="emoticon" src="${emoji}">`);
    });
    divEmoticons.appendChild(emojiIco);
  }
  return true;
}

export function showEmoticons(sectionPublication) {
  const divEmoticon = sectionPublication.querySelector('.div-emoticons');
  const inputUploader = sectionPublication.querySelector('.div-uploader');
  const emoticon = sectionPublication.querySelector('.share-stickers-logo');
  emoticon.addEventListener('click', () => {
    if (divEmoticon.style.display === 'none') {
      divEmoticon.style.display = 'grid';
      inputUploader.style.display = 'none';
    } else {
      divEmoticon.style.display = 'none';
    }
  });
}

export function buttonEditMain(buttonEdit) {
  buttonEdit.forEach((btn2) => {
    btn2.addEventListener('click', async (e) => {
      const doc3 = await getOnlyPublication(e.target.dataset.id); // trae publicaciones por id
      const id = e.target.dataset.id;
      const sectionPublication = btn2.parentNode.parentNode.parentNode;
      const buttonSave = sectionPublication.querySelector('.btn-save');
      // MOSTRAMOS Y ACTIVAMOS CONTENEDORES
      filesShow(sectionPublication);
      // AÑADIENDO STICKERS
      // eslint-disable-next-line no-plusplus
      createEmoticon(sectionPublication);
      showEmoticons(sectionPublication);
      // GUARDAR CAMBIOS
      buttonSave.addEventListener('click', () => {
        buttonSaveEdit(buttonSave, doc3, sectionPublication, id);
      });
    });
  });
  return true;
}

// FUNCIÓN PARA ELIMINAR PUBLICACIONES
export function deletePublicationWithMessage(sectionPublication) {
  const buttonDeleteOnly = sectionPublication.querySelector('.share-trash-logo');
  const messageAlert = sectionPublication.querySelector('.div-alert-message-color');
  const messageAlertYes = sectionPublication.querySelector('.button-yes');
  const messageAlertNo = sectionPublication.querySelector('.button-no');
  buttonDeleteOnly.addEventListener('click', () => {
    messageAlert.style.display = 'block';
    messageAlertYes.addEventListener('click', ({ target: { dataset } }) => {
      deletePublication(dataset.id);
      messageAlert.style.display = 'none';
    });
    messageAlertNo.addEventListener('click', () => {
      messageAlert.style.display = 'none';
    });
  });
}

// FUNCIÓN PARA MOSTRAR Y OCULTAR CONTENEDOR DE FOTOS Y EMOTICONES
export function hideShowDivUploader(sectionPublication) {
  const divUploader = sectionPublication.querySelector('.div-uploader');
  const buttonShare = sectionPublication.querySelector('.share-image-logo');
  const divEmoticon = sectionPublication.querySelector('.div-emoticons');
  buttonShare.addEventListener('click', () => {
    if (divUploader.style.display === 'none') {
      divUploader.style.display = 'flex';
      divEmoticon.style.display = 'none';
    } else {
      divUploader.style.display = 'none';
    }
  });
}
// FUNCIÓN PARA PUBLICAR FOTO
export function uploaderImagePublication(sectionPublication) {
  const inputUploader = sectionPublication.querySelector('.img-uploader');
  const areaText = sectionPublication.querySelector('.text-area');
  const divChangeLogoDisplay = sectionPublication.querySelector('.div-display-change');
  inputUploader.addEventListener('change', (e) => {
    const divPreview = document.createElement('div');
    divPreview.className = 'div-preview';
    const imagePreview = document.createElement('img');
    imagePreview.id = 'imgPreview';
    divPreview.appendChild(imagePreview);
    areaText.appendChild(divPreview);
    const file = e.target.files[0]; // url de la foto
    divChangeLogoDisplay.style.display = 'block';
    publicationUser(file, imagePreview, divChangeLogoDisplay.style);
  });
}

// FUNCIÓN PARA CREAR PUBLICACIÓN

export function createPublicationFeed(publicationNew, doc2, photo, name) {
  let html = '';
  if (sessionStorage.getItem('uid') === publicationNew.uid) {
    html += `
    <section class= 'container-publication-final' >
        <div style='display:none;' class = 'message-alert-content div-alert-message-color'>
            <p>¿Estas seguro de eliminar esta publicación?</p>
            <button  class ='button-yes button-alert' data-id='${doc2.id}' >SI</button>
            <button class= 'button-no button-alert'>NO</button>
        </div>
      <div class = 'container-user-date' >
        ${f.formatTime(publicationNew.date)}
      </div>
      <div class = 'container-user-edit direction' >
     
         <figure class = figure-name-photo direction' >
             <img class= 'photo-user-pub' id = 'photoUser' src='${sessionStorage.getItem('photoUser')}' alt='foto de perfil'>
             <figcaption class ='user-name-pub' >${sessionStorage.getItem('nameUser')}</figcaption>
             <img class= 'share-edit-logo' data-id='${doc2.id}' src='img/icomon/pencil.jpg' alt='logo para editar'>
             <img class= 'share-trash-logo' data-id='${doc2.id}' src='img/icomon/bin.jpg' alt='logo para eliminar publicación'>
         </figure>
      </div>
      <div class='div-display-change' style='display: none;'>
            <div class='div-logo-change-image-publication'>
              <img src='../img/cargando.gif' alt='gif de cargando'>
            </div>
      </div>
      <div  contentEditable ='false' class= 'title-area '  id= 'newTitle' >${publicationNew.title}</div>
      <div  contentEditable ='false'   class= 'text-area div-text' id= 'newText'>${publicationNew.text}
      </div>
      <div class = 'direction' >
         <img style='display:none;' class="share-image-logo logo-smile-image" data-id='${doc2.id}'  src="img/icomon/images.jpg" alt="logo para agregar imagenes a la publicación">
         <img  style='display:none;' class='share-stickers-logo like-love-smile ' src='img/icomon/smile.jpg' alt='logo para agregar stickers a la publicación'>
         <img class= 'like-love-smile btnlike' data-id='${doc2.id}' src= ${!publicationNew.like ? 'img/icomon/like.jpg' : publicationNew.like.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/likeO.jpg' : 'img/icomon/like.jpg'} alt='logo para dar me encanta'><figcaption class ='count-like-love' >${publicationNew.like ? publicationNew.like.length : 0}</figcaption>
         <img class= 'like-love-smile btnlove' data-id='${doc2.id}' src= ${!publicationNew.love ? 'img/icomon/heart.jpg' : publicationNew.love.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/heartO.jpg' : 'img/icomon/heart.jpg'} alt='logo para dar love'><figcaption class ='count-like-love' >${publicationNew.love ? publicationNew.love.length : 0}</figcaption>
         <button style='display:none;'  class = 'btn-save'>Guardar cambios</button>
         <div class='div-emoticons ' id='divEmoticon'; style='display: none;'></div>
      </div>
      <div class = 'div-uploader' style='display:none;'>
             <input type ='file' id = 'imgUploader' class = 'img-uploader' >
      </div>
    </section>`;
  } else {
    html += `
    <section class= 'container-publication-final' >
      <div class = 'container-user-date' >
      ${f.formatTime(publicationNew.date)}
      </div>
      <div class = 'container-user-edit direction' >
         <figure class = figure-name-photo direction' >
             <img class= 'photo-user-pub' id = 'photoUser' src='${photo}'  alt='foto de perfil'>
             <figcaption class ='user-name-pub' >${name}</figcaption>
         </figure>
      </div>
      <div  contentEditable ='false' id= 'newTitle'>${publicationNew.title}</div>
      <div  contentEditable ='false'  class= 'p-text-publication' id= 'newText' >${publicationNew.text}</div>
      <div class = 'direction' >
      <img class= 'like-love-smile btnlike' data-id='${doc2.id}' src= ${!publicationNew.like ? 'img/icomon/like.jpg' : publicationNew.like.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/likeO.jpg' : 'img/icomon/like.jpg'} alt='logo para dar me encanta'><figcaption class ='count-like-love' >${publicationNew.like ? publicationNew.like.length : 0}</figcaption>
      <img class= 'like-love-smile btnlove' data-id='${doc2.id}' src= ${!publicationNew.love ? 'img/icomon/heart.jpg' : publicationNew.love.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/heartO.jpg' : 'img/icomon/heart.jpg'} alt='logo para dar love'><figcaption class ='count-like-love' >${publicationNew.love ? publicationNew.love.length : 0}</figcaption>
      </div>
    </section>
  `;
  }
  return html;
}
export function createPublicationProfile(publicationNew, doc2) {
  const html = `
        <section class= 'container-publication-final' >
            <div style='display:none;' class = 'message-alert-content div-alert-message-color'>
                <p>¿Estas seguro de eliminar esta publicación?</p>
                <button  class ='button-yes button-alert' data-id='${doc2.id}' >SI</button>
                <button class= 'button-no button-alert'>NO</button>
            </div>
            <div class = 'container-user-date' >
              ${f.formatTime(publicationNew.date)}
            </div>
          <div class = 'container-user-edit direction' >
             <figure class = figure-name-photo direction' >
                 <img class= 'photo-user-pub' id = 'photoUser' src='${sessionStorage.getItem('photoUser')}' alt='foto de perfil'>
                 <figcaption class ='user-name-pub' >${sessionStorage.getItem('nameUser')}</figcaption>
                 <img class= 'share-edit-logo' data-id='${doc2.id}' src='img/icomon/pencil.jpg' alt='logo para editar'>
                 <img class= 'share-trash-logo' data-id='${doc2.id}' src='img/icomon/bin.jpg' alt='logo para eliminar publicación'>
             </figure>
          </div>
          <div class='div-display-change' style='display: none;'>
          <div class='div-logo-change-image-publication'>
                   <img src='../img/cargando.gif' alt='gif de cargando'>
              </div>
          </div>
          <div  contentEditable ='false' class= 'title-area '  id= 'newTitle' >${publicationNew.title}</div>
          <div  contentEditable ='false'   class= 'text-area div-text' id= 'newText'>${publicationNew.text}</div>
         <div class = 'direction' >
         <img style='display:none;' class="share-image-logo logo-smile-image" data-id='${doc2.id}'  src="img/icomon/images.jpg" alt="logo para agregar imagenes a la publicación">
             <img  style='display:none;' class='share-stickers-logo like-love-smile' src='img/icomon/smile.jpg' alt='logo para agregar stickers a la publicación'>
             <img class= 'like-love-smile btnlike' data-id='${doc2.id}' src= ${!publicationNew.like ? 'img/icomon/like.jpg' : publicationNew.like.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/likeO.jpg' : 'img/icomon/like.jpg'} alt='logo para dar me encanta'><figcaption class ='count-like-love' >${publicationNew.like ? publicationNew.like.length : 0}</figcaption>
             <img class= 'like-love-smile btnlove' data-id='${doc2.id}' src= ${!publicationNew.love ? 'img/icomon/heart.jpg' : publicationNew.love.find((e) => e === sessionStorage.getItem('uid')) ? 'img/icomon/heartO.jpg' : 'img/icomon/heart.jpg'} alt='logo para dar love'><figcaption class ='count-like-love' >${publicationNew.love ? publicationNew.love.length : 0}</figcaption>
             <button style='display:none;'  class = 'btn-save'>Guardar cambios</button>
             <div class='div-emoticons' id='divEmoticon'; style='display: none;'></div>
          </div>
          <div class = 'div-uploader' style='display:none;'>
               <input type ='file' id = 'imgUploader' class = 'img-uploader' >
          </div>
          
        </section>
       `;
  return html;
}

export function createPhotoCoverPage(profileNew) {
  const html = `
    <div class="container-coverPage-profilePhoto" id="coverProfileContainer"  style="background-image: url('${profileNew.urlCoverPage}');">
    <div class="photo-profile" style="background-image: url('${profileNew.urlPhotoUser}');">
      <div class="div-uploader-photo">
       <input type="file" id="imgUploaderphoto">
      </div>
    </div>
    <div class="name-usuario">
        <label class="name-label" id="nameLabel"> Bienvenid@ ${profileNew.name}</label>
    </div>
    <div class="div-uploader-cover-page">
         <input type="file" id="imgUploaderPortada">
    </div>
    </div>
    `;
  return html;
}
