/* FUNCIONES DE LAS PUBLICACIONES */
const f = {
  // agrega fecha a las publicaciones
  formatTime(dateTime) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = dateTime.toDate().toLocaleDateString('es-ES', options);
    const time = dateTime.toDate().toLocaleTimeString('es-ES');
    const dateT = `${date} ${time}`;
    return dateT;
  },
  // función que permite agregar emoji en cualquier parte del texto
  pasteHtmlAtCaret(html) {
    let range;
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        const el = document.createElement('div');
        el.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node;
        let lastNode;
        // eslint-disable-next-line no-cond-assign
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        return true;
      }
      return false;
    }
    return false;
  },
  validyEmail(value) {
    const regexEmail = /([\da-z_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
    return regexEmail.test(value);
  },
  validyPassword(value) {
    const regexMinus = /(?=.*[a-z]).+$/;
    const regexMayus = /(?=.*[A-Z]).+$/;
    const regexNumber = /(?=.*[0-9]).+$/;
    const regexCharac = /(?=.*[-+_!@#$%^&*.,?]).+$/;
    let count = 0;
    let cant;
    let minus;
    let mayus;
    let number;
    let character;
    let divH;
    let levelS;

    if (value.length >= 6) {
      cant = 'Min(6): <img src=\'img/check.png\'>';
      divH = 'none';
      count += 1;
    } else {
      cant = 'Min(6): <img src=\'img/false.png\'>';
      divH = 'block';
    }
    if (regexMinus.test(value)) {
      minus = 'Minus: <img src=\'img/check.png\'>';
      count += 1;
    } else {
      minus = 'Minus: <img src=\'img/false.png\'>';
    }
    if (regexMayus.test(value)) {
      mayus = 'Mayus: <img src=\'img/check.png\'>';
      count += 1;
    } else {
      mayus = 'Mayus: <img src=\'img/false.png\'>';
    }
    if (regexNumber.test(value)) {
      number = 'Num: <img src=\'img/check.png\'>';
      count += 1;
    } else {
      number = 'Num: <img src=\'img/false.png\'>';
    }
    if (regexCharac.test(value)) {
      character = 'Carac: <img src=\'img/check.png\'>';
      count += 1;
    } else {
      character = 'Carac: <img src=\'img/false.png\'>';
    }

    switch (count) {
      case 3:
        levelS = 'input-form div-level-medium';
        break;
      case 4:
        levelS = 'input-form div-level-higth';
        break;
      case 5:
        levelS = 'input-form div-level-higth-top';
        break;
      default:
        levelS = 'input-form div-level-low';
        break;
    }
    // eslint-disable-next-line object-curly-newline
    return { cant, minus, mayus, number, character, divH, levelS };
  },
};

export default f;
