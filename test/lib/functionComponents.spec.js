/* eslint-disable object-curly-newline */
import { Feed } from '../../src/components/Feed.js';
import { Profile } from '../../src/components/Profile.js';
import {
  filesHide, buttonSaveEdit, createEmoticon, showEmoticons,
  filesShow, buttonEditMain, deletePublicationWithMessage, hideShowDivUploader,
  createPublicationFeed, createPublicationProfile, createPhotoCoverPage,
} from '../../src/lib/functionComponents.js';
import f from '../../src/lib/functions.js';

jest.mock('../../src/lib/imports/firebase-imports.js');

/* FEED */
describe('Feed', () => {
  it('función que contiene texto HTML', () => {
    expect(typeof Feed().textContent).toBe('string');
  });
  it('MainTemplate contiene texto HTML', () => {
    const result = Feed();
    const mainTemplate = result.querySelector('#mainTemplate');
    expect(typeof mainTemplate.textContent).toBe('string');
  });

  const result = Feed();
  const mainTemplate = result.querySelector('#mainTemplate');
  const buttonEdit = mainTemplate.querySelectorAll('.share-edit-logo');
  it('función buttonEditMain ', () => {
    expect(buttonEditMain(buttonEdit)).toBe(true);
  });
});

describe('filesShow', () => {
  it('Mostrar contenedores y elementos a usar', () => {
    const sectionPublication = document.createElement('section');
    sectionPublication.innerHTML = `
       <div class = "share-stickers-logo" ></div>
       <div class = "share-image-logo"></div>
       <div class = "btn-save"></div>
       <div class = "title-area"></div>
       <div class = "text-area"></div>
       `;
    document.body.appendChild(sectionPublication);
    filesShow(sectionPublication);
    const emoticon = sectionPublication.querySelector('.share-stickers-logo');
    const imgUploader = sectionPublication.querySelector('.share-image-logo');
    const areaTitle = sectionPublication.querySelector('.title-area');
    const areaText = sectionPublication.querySelector('.text-area');
    expect(emoticon.style.display).toBe('block');
    expect(imgUploader.style.display).toBe('block');
    expect(areaTitle.contentEditable).toBe(true);
    expect(areaText.contentEditable).toBe(true);
  });
});

describe('filesHide', () => {
  it('Ocultar contenedores y elementos a usar', () => {
    const sectionPublication = document.createElement('section');
    sectionPublication.innerHTML = `
       <div class = "share-stickers-logo" ></div>
       <div class = "btn-save"></div>
       <div class = "title-area"></div>
       <div class = "text-area"></div>
       `;
    document.body.appendChild(sectionPublication);
    filesHide(sectionPublication);
    const emoticon = sectionPublication.querySelector('.share-stickers-logo');
    const buttonSave = sectionPublication.querySelector('.btn-save');
    const areaTitle = sectionPublication.querySelector('.title-area');
    const areaText = sectionPublication.querySelector('.text-area');
    expect(emoticon.style.display).toBe('none');
    expect(buttonSave.style.display).toBe('none');
    expect(areaTitle.contentEditable).toBe(false);
    expect(areaText.contentEditable).toBe(false);
  });
});

describe('buttonSaveEdit', () => {
  it('buttonSaveEdit', () => {
    const sectionPublication = document.createElement('section');
    sectionPublication.innerHTML = `
    <div class = "share-stickers-logo" ></div>
     <div class = "btn-save"></div>
     <div class = "title-area" id = "newTitle"></div>
     <div class = "text-area" id = "newText"></div>
     `;
    document.body.appendChild(sectionPublication);
    const doc3 = {
      data: () => ({
        title: 'holi',
        text: 'texto',
      }),
    };
    const buttonSave = sectionPublication.querySelector('.btn-save');
    const id = 'Umn8appNPisPz4eBhswX';
    expect(buttonSaveEdit(buttonSave, doc3, sectionPublication, id)).toBe(true);
  });
});

describe('showEmoticons', () => {
  it('con el evento click se oculta y aparece el contenedor', () => {
    const sectionPublication = document.createElement('section');
    sectionPublication.innerHTML = `
    <button class = "share-stickers-logo"></button>
     <div class = "div-emoticons" ></div>
     <input class = "div-uploader"></input>
     `;
    document.body.appendChild(sectionPublication);
    showEmoticons(sectionPublication);
    const divEmoticon = sectionPublication.querySelector('.div-emoticons');
    const divUploader = sectionPublication.querySelector('.div-uploader');
    const emoticon = sectionPublication.querySelector('.share-stickers-logo');
    divEmoticon.style.display = 'none';
    divUploader.style.display = 'none';
    emoticon.dispatchEvent(new Event('click'));
    expect(divEmoticon.style.display).toBe('grid');
    emoticon.dispatchEvent(new Event('click'));
    expect(divUploader.style.display).toBe('none');
  });
});

describe('createEmoticon', () => {
  it('cuando no se agrega ningun emoji en el texto', () => {
    const sectionPublication = document.createElement('section');
    sectionPublication.innerHTML = `
     <div class = "div-emoticons" ></div>
     <input class = "text-area"></input>
     <img id = "emojiIco" >
     `;
    document.body.appendChild(sectionPublication);
    createEmoticon(sectionPublication);
    const divText = sectionPublication.querySelector('.text-area');
    const emojiIco = sectionPublication.querySelector('#emojiIco');
    emojiIco.dispatchEvent(new Event('click'));
    divText.focus();
    const pasteHtmlAtCaret = f.pasteHtmlAtCaret('<img class="emoticon" src="img/emoji/emoji1.png">');
    expect(pasteHtmlAtCaret).toBe(false);
  });
});

describe('deletePublicationWithMessage', () => {
  const sectionPublication = document.createElement('section');
  sectionPublication.innerHTML = `
     <img class = "share-trash-logo" >
     <button class = "button-yes" ></button>
     <button class = "button-no" ></button>
     <div class = "div-alert-message-color"></div>
     `;
  document.body.appendChild(sectionPublication);
  const buttonDeleteOnly = sectionPublication.querySelector('.share-trash-logo');
  const messageAlert = sectionPublication.querySelector('.div-alert-message-color');
  const messageAlertYes = sectionPublication.querySelector('.button-yes');
  const messageAlertNo = sectionPublication.querySelector('.button-no');
  messageAlert.style.display = 'none';
  it('muestra el mensaje de confirmación de eliminación', () => {
    deletePublicationWithMessage(sectionPublication);
    buttonDeleteOnly.dispatchEvent(new Event('click'));
    expect(messageAlert.style.display).toBe('block');
  });
  it('si marca si, oculta el mensaje', () => {
    deletePublicationWithMessage(sectionPublication);
    messageAlertYes.dispatchEvent(new Event('click'));
    expect(messageAlert.style.display).toBe('none');
  });
  it('si marca no, oculta el mensaje', () => {
    deletePublicationWithMessage(sectionPublication);
    messageAlertNo.dispatchEvent(new Event('click'));
    expect(messageAlert.style.display).toBe('none');
  });
});

describe('hideShowDivUploader', () => {
  const sectionPublication = document.createElement('section');
  sectionPublication.innerHTML = `
     <img class = "share-image-logo" >
     <div class = "div-emoticons" ></div>
     <div class = "div-uploader"></div>
     `;
  document.body.appendChild(sectionPublication);
  const divUploader = sectionPublication.querySelector('.div-uploader');
  const buttonShare = sectionPublication.querySelector('.share-image-logo');
  const divEmoticon = sectionPublication.querySelector('.div-emoticons');
  divUploader.style.display = 'none';
  it('si los emoticones se muestran el input de fotos de oculta', () => {
    hideShowDivUploader(sectionPublication);
    buttonShare.dispatchEvent(new Event('click'));
    expect(divUploader.style.display).toBe('flex');
    expect(divEmoticon.style.display).toBe('none');
    buttonShare.dispatchEvent(new Event('click'));
    expect(divUploader.style.display).toBe('none');
  });
});

describe('createPublicationFeed', () => {
  it('Mostrar elementos de publication template si no es el usuario', () => {
    sessionStorage.setItem('uid', 'uid1');
    const toLocal = {
      toLocaleDateString: () => '5 de mayo de 2022',
      toLocaleTimeString: () => '12:00:00',
    };
    const dateT = {
      toDate: () => toLocal,
    };
    const publicationNew = { uid: 'uid', title: 'title', text: 'text', date: dateT };
    const doc2 = { id: 'id' };
    const photo = 'Photo';
    const name = 'Name';
    const publication = createPublicationFeed(publicationNew, doc2, photo, name);
    expect(typeof publication).toBe('string');
  });
  it('Mostrar elementos de publication template si no es el usuario, hizo like love', () => {
    sessionStorage.setItem('uid', 'uid1');
    const toLocal = {
      toLocaleDateString: () => '5 de mayo de 2022',
      toLocaleTimeString: () => '12:00:00',
    };
    const dateT = {
      toDate: () => toLocal,
    };
    const publicationNew = { uid: 'uid', title: 'title', text: 'text', date: dateT, like: ['uid1'], love: ['uid1'] };
    const doc2 = { id: 'id' };
    const photo = 'Photo';
    const name = 'Name';
    const publication = createPublicationFeed(publicationNew, doc2, photo, name);
    expect(typeof publication).toBe('string');
  });
  it('Mostrar elementos de publication template si es el usuario', () => {
    sessionStorage.setItem('uid', 'uid');
    const toLocal = {
      toLocaleDateString: () => '5 de mayo de 2022',
      toLocaleTimeString: () => '12:00:00',
    };
    const dateT = {
      toDate: () => toLocal,
    };
    const publicationNew = { uid: 'uid', title: 'title', text: 'text', date: dateT };
    const doc2 = { id: 'id' };
    const photo = 'Photo';
    const name = 'Name';
    const publication = createPublicationFeed(publicationNew, doc2, photo, name);
    expect(typeof publication).toBe('string');
  });
  it('Mostrar elementos de publication template si es el usuario, hizo like love', () => {
    sessionStorage.setItem('uid', 'uid');
    const toLocal = {
      toLocaleDateString: () => '5 de mayo de 2022',
      toLocaleTimeString: () => '12:00:00',
    };
    const dateT = {
      toDate: () => toLocal,
    };
    const publicationNew = { uid: 'uid', title: 'title', text: 'text', date: dateT, like: ['uid'], love: ['uid'] };
    const doc2 = { id: 'id' };
    const photo = 'Photo';
    const name = 'Name';
    const publication = createPublicationFeed(publicationNew, doc2, photo, name);
    expect(typeof publication).toBe('string');
  });
});

describe('createPublicationprofile', () => {
  it('Mostrar elementos de publication template del usuario', () => {
    sessionStorage.setItem('uid', 'uid');
    const toLocal = {
      toLocaleDateString: () => '5 de mayo de 2022',
      toLocaleTimeString: () => '12:00:00',
    };
    const dateT = {
      toDate: () => toLocal,
    };
    const publicationNew = { uid: 'uid', title: 'title', text: 'text', date: dateT };
    const doc2 = { id: 'id' };
    const publication = createPublicationProfile(publicationNew, doc2);
    expect(typeof publication).toBe('string');
  });
  it('Mostrar elementos de publication template del usuario, hizo like love', () => {
    sessionStorage.setItem('uid', 'uid');
    const toLocal = {
      toLocaleDateString: () => '5 de mayo de 2022',
      toLocaleTimeString: () => '12:00:00',
    };
    const dateT = {
      toDate: () => toLocal,
    };
    const publicationNew = { uid: 'uid', title: 'title', text: 'text', date: dateT, like: ['uid'], love: ['uid'] };
    const doc2 = { id: 'id' };
    const publication = createPublicationProfile(publicationNew, doc2);
    expect(typeof publication).toBe('string');
  });
});

describe('createPhotoCoverPage', () => {
  it('Mostrar foto del usuario', () => {
    const result = Profile();
    const coverPagePhotoContainer = result.querySelector('.container-coverpage-Photo');
    coverPagePhotoContainer.innerHTML = `
       <img id = "imgUploaderphoto" >
       <img id = "imgUploaderPortada">
       `;
    document.body.appendChild(coverPagePhotoContainer);
    const imageUploaderPhoto = coverPagePhotoContainer.querySelector('#imgUploaderphoto');
    const imageUploaderCover = coverPagePhotoContainer.querySelector('#imgUploaderPortada');

    const divChangeImageDisplay = result.querySelector('#divChangeImageDisplay');
    imageUploaderPhoto.innerHTML = 'img/image.png';
    imageUploaderPhoto.dispatchEvent(new Event('change'));
    imageUploaderCover.dispatchEvent(new Event('change'));
    expect(divChangeImageDisplay.style.display).toBe('none');
  });
  const profileNew = {
    urlCoverPage: 'img/image.png',
    urlPhotoUser: 'img/image.png',
    name: 'user',
  };
  createPhotoCoverPage(profileNew);
  expect(typeof createPhotoCoverPage(profileNew)).toBe('string');
});

describe('Profile', () => {
  it('función que contiene texto HTML', () => {
    expect(typeof Profile().textContent).toBe('string');
  });
  it('profileContainer contiene texto HTML', () => {
    const result = Profile();
    const profileContainer = result.querySelector('#containerProfile');
    expect(typeof profileContainer).toBe('object');
  });
});
