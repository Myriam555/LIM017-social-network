/* eslint-disable max-len */
// eslint-disable-next-line object-curly-newline
const { dowloadImagePhoto, photoUser, dowloadCoverPage, coverPageUser, publicationUser } = require('../src/lib/storage.js');

jest.mock('../src/lib/imports/firebase-imports.js');
// jest.mock('../src/lib/storage.js');

describe('dowloadImagePhoto', () => {
  it('The function dowloadImagePhoto return a photo when exists.', () => dowloadImagePhoto('exist')
    .then((data) => {
      expect(data).toEqual('urlPhoto');
    }));

  it('The function dowloadImagePhoto throws a exception when not exists.', () => dowloadImagePhoto('asdasadasd.jpg')
    .catch((data) => {
      expect(data).toEqual('Photo not exists');
    }));

  it('The function photoUser return true when upload a profile photo.', () => photoUser({ name: 'myphoto.jpg' }, {})
    .then((data) => {
      expect(data).toEqual(true);
    }));

  it('The function photoUser throws a exception when not exists.', () => photoUser({ name: '' })
    .catch((data) => {
      expect(data).toEqual('Photo not exists');
    }));

  it('The function dowloadCoverPage return a photoCover when exists.', () => dowloadCoverPage('exist')
    .then((data) => {
      expect(data).toEqual('urlPhoto');
    }));

  it('The function dowloadCoverPage throws a exception when not exists.', () => dowloadCoverPage('mynewphoto.jpg')
    .catch((data) => {
      expect(data).toEqual('Photo not exists');
    }));

  it('The function coverPageUser return true when upload a profile photo.', () => coverPageUser({ name: 'myphotoCover.jpg' }, {})
    .then((data) => {
      expect(data).toEqual(true);
    }));
  it('The function publicationUser return true when upload a profile photo.', () => publicationUser({ name: 'myphotoPublication.jpg' }, {})
    .then((data) => {
      expect(data).toEqual(true);
    }));
});
