// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../Router.js';
// eslint-disable-next-line import/no-cycle
import { register } from '../lib/auth.js';
import f from '../lib/functions.js';

export const Register = () => {
  const sectionRegister = document.createElement('section');
  sectionRegister.id = 'pageCreate';

  const divHeader = document.createElement('div');
  divHeader.id = 'pageCreateHeader';
  const imgLogo = document.createElement('img');
  imgLogo.className = 'img-login';
  imgLogo.src = 'img/logo4.png';

  const divContent = document.createElement('div');
  divContent.id = 'pageCreateContent';
  const title = document.createElement('h3');
  title.innerText = 'REGISTRO DE USUARIO';

  const labelName = document.createElement('label');
  labelName.className = 'label-form';
  labelName.innerText = 'Nombre *';
  const inputName = document.createElement('input');
  inputName.className = 'input-form';
  inputName.id = 'inputName';

  const labelEmail = document.createElement('label');
  labelEmail.className = 'label-form';
  labelEmail.innerText = 'Correo *';
  const inputEmail = document.createElement('input');
  inputEmail.className = 'input-form';
  inputEmail.id = 'inputEmail';
  inputEmail.type = 'email';

  const labelPassword = document.createElement('label');
  labelPassword.className = 'label-form';
  labelPassword.innerText = 'Contraseña *';
  const divPassword = document.createElement('div');
  divPassword.className = 'input-form div-form';
  const inputPassword = document.createElement('input');
  inputPassword.className = 'input-password';
  inputPassword.id = 'inputPassword';
  inputPassword.type = 'password';

  const icoEye = document.createElement('i');
  icoEye.className = 'ico-eye-hide';
  icoEye.id = 'icoEyeHide';
  icoEye.addEventListener('click', () => { if (icoEye.className === 'ico-eye-hide') { icoEye.className = 'ico-eye'; inputPassword.type = 'text'; } else { icoEye.className = 'ico-eye-hide'; inputPassword.type = 'password'; } });

  // Nivel de seguridad de contraseña
  const divLevelSecurity = document.createElement('div');
  divLevelSecurity.className = 'input-form div-level-low';
  const divDescSecurity = document.createElement('div');
  divDescSecurity.id = 'divSecurityPassword';
  const descSecurityCant = document.createElement('div');
  descSecurityCant.id = 'descSecurityCant';
  descSecurityCant.innerHTML = 'Min(6): <img src=\'img/false.png\'></img>';
  const descSecurityMin = document.createElement('div');
  descSecurityMin.innerHTML = 'Minus: <img src=\'img/false.png\'></img>';
  const descSecurityMay = document.createElement('div');
  descSecurityMay.innerHTML = 'Mayus: <img src=\'img/false.png\'></img>';
  const descSecurityNumber = document.createElement('div');
  descSecurityNumber.innerHTML = 'Num: <img src=\'img/false.png\'></img>';
  const descSecurityCharacter = document.createElement('div');
  descSecurityCharacter.innerHTML = 'Carac: <img src=\'img/false.png\'></img>';

  const divPasswordHide = document.createElement('div');
  divPasswordHide.className = 'message-hide';
  divPasswordHide.innerText = 'Contraseña invalida';

  const labelConfirmPassword = document.createElement('label');
  labelConfirmPassword.className = 'label-form';
  labelConfirmPassword.innerText = 'Confirmar contraseña *';
  const divConfirmPassword = document.createElement('div');
  divConfirmPassword.className = 'input-form div-form';
  const inputConfirmPassword = document.createElement('input');
  inputConfirmPassword.className = 'input-password';
  inputConfirmPassword.id = 'inputConfirmPassword';
  inputConfirmPassword.type = 'password';

  const icoEyeConfirm = document.createElement('i');
  icoEyeConfirm.className = 'ico-eye-hide';
  icoEyeConfirm.id = 'icoEyeConfirm';
  icoEyeConfirm.addEventListener('click', () => {
    if (icoEyeConfirm.className === 'ico-eye-hide') {
      icoEyeConfirm.className = 'ico-eye'; inputConfirmPassword.type = 'text';
    } else { icoEyeConfirm.className = 'ico-eye-hide'; inputConfirmPassword.type = 'password'; }
  });

  // boton se registrar
  const divButtons = document.createElement('div');
  divButtons.className = 'text-center';
  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'button-form';
  buttonRegister.id = 'buttonForm';
  buttonRegister.innerText = 'Registrar';
  // boton de iniciar sesión
  const buttonReturn = document.createElement('button');
  buttonReturn.className = 'button-form';
  buttonReturn.innerText = 'Iniciar sesión';
  buttonReturn.id = 'iniciarSesion';
  buttonReturn.addEventListener('click', () => onNavigate('/'));

  // creando div oculto
  const divNameHide = document.createElement('div');
  divNameHide.className = 'message-hide';
  divNameHide.innerText = 'Nombre invalido';

  const divEmailHide = document.createElement('div');
  divEmailHide.className = 'message-hide';
  divEmailHide.id = 'messageHide';
  divEmailHide.innerText = 'Correo invalido';

  const divPasswordConfirmHide = document.createElement('div');
  divPasswordConfirmHide.className = 'message-hide';
  divPasswordConfirmHide.innerText = 'Confirmar contraseña es incorrecta';

  const divMessageAlert = document.createElement('div');
  divMessageAlert.className = 'message-alert';

  const icoMessageAlertContent = document.createElement('i');
  icoMessageAlertContent.className = 'ico-correct';
  const buttonMessageAlertContent = document.createElement('button');
  buttonMessageAlertContent.className = 'button-alert-content';
  buttonMessageAlertContent.innerText = 'OK';
  const divMessageAlertContent = document.createElement('div');
  divMessageAlertContent.className = 'message-alert-content';
  const textMessageAlertContent = document.createElement('p');
  textMessageAlertContent.innerText = 'REGISTRO CORRECTO';

  const divMessageAlertIncorrect = document.createElement('div');
  divMessageAlertIncorrect.className = 'message-alert';

  const icoMessageAlertContentIncorrect = document.createElement('i');
  icoMessageAlertContentIncorrect.className = 'ico-incorrect';
  const buttonMessageAlertContentIncorrect = document.createElement('button');
  buttonMessageAlertContentIncorrect.className = 'button-alert-content';
  buttonMessageAlertContentIncorrect.innerText = 'OK';
  const divMessageAlertContentIncorrect = document.createElement('div');
  divMessageAlertContentIncorrect.className = 'message-alert-content';
  const textMessageAlertContentIncorrect = document.createElement('p');
  textMessageAlertContentIncorrect.innerText = 'REGISTRO INCORRECTO';
  const textMessageIncorrect = document.createElement('p');
  textMessageIncorrect.id = 'textMessageIncorrect';
  textMessageIncorrect.style.fontSize = '14px';

  // validando correo
  inputEmail.addEventListener('keyup', () => {
    // eslint-disable-next-line no-unused-expressions
    !f.validyEmail(inputEmail.value) ? divEmailHide.style.display = 'block' : divEmailHide.style.display = 'none';
  });

  // validado contraseña
  inputPassword.addEventListener('keyup', () => {
    const val = f.validyPassword(inputPassword.value);
    descSecurityCant.innerHTML = val.cant;
    divPasswordHide.style.display = val.divH;
    descSecurityMin.innerHTML = val.minus;
    descSecurityMay.innerHTML = val.mayus;
    descSecurityNumber.innerHTML = val.number;
    descSecurityCharacter.innerHTML = val.character;
    divLevelSecurity.className = val.levelS;
  });

  divHeader.appendChild(imgLogo);
  divContent.appendChild(title);

  divContent.appendChild(labelName);
  divContent.appendChild(inputName);
  divContent.appendChild(divNameHide);

  divContent.appendChild(labelEmail);
  divContent.appendChild(inputEmail);
  divContent.appendChild(divEmailHide);

  divContent.appendChild(labelPassword);
  divPassword.appendChild(inputPassword);
  divPassword.appendChild(icoEye);
  divContent.appendChild(divPassword);
  divContent.appendChild(divPasswordHide);

  divContent.appendChild(labelConfirmPassword);
  divConfirmPassword.appendChild(inputConfirmPassword);
  divConfirmPassword.appendChild(icoEyeConfirm);
  divContent.appendChild(divConfirmPassword);
  divContent.appendChild(divPasswordConfirmHide);

  divContent.appendChild(divLevelSecurity);
  divDescSecurity.appendChild(descSecurityCant);
  divDescSecurity.appendChild(descSecurityMin);
  divDescSecurity.appendChild(descSecurityMay);
  divDescSecurity.appendChild(descSecurityNumber);
  divDescSecurity.appendChild(descSecurityCharacter);
  divContent.appendChild(divDescSecurity);

  divButtons.appendChild(buttonRegister);
  divButtons.appendChild(buttonReturn);
  divContent.appendChild(divButtons);

  divMessageAlertContent.appendChild(icoMessageAlertContent);
  divMessageAlertContent.appendChild(textMessageAlertContent);
  divMessageAlertContent.appendChild(buttonMessageAlertContent);
  divMessageAlert.appendChild(divMessageAlertContent);

  divContent.appendChild(divMessageAlert);

  divMessageAlertContentIncorrect.appendChild(icoMessageAlertContentIncorrect);
  divMessageAlertContentIncorrect.appendChild(textMessageAlertContentIncorrect);
  divMessageAlertContentIncorrect.appendChild(textMessageIncorrect);
  divMessageAlertContentIncorrect.appendChild(buttonMessageAlertContentIncorrect);
  divMessageAlertIncorrect.appendChild(divMessageAlertContentIncorrect);

  divContent.appendChild(divMessageAlertIncorrect);

  sectionRegister.appendChild(divHeader);
  sectionRegister.appendChild(divContent);

  // funciones para registrar y validar
  async function resultRegister() {
    // eslint-disable-next-line max-len
    const resp = await register(inputName.value, inputEmail.value, inputPassword.value);
    let result = '';
    if (resp === true) { //
      divMessageAlert.style.display = 'flex';
      result = true;
    } else {
      textMessageIncorrect.innerText = resp;
      divMessageAlertIncorrect.style.display = 'flex';
      result = false;
    }
    return result;
  }

  buttonRegister.addEventListener('click', () => {
    // para agregar nuevo usuario
    if (inputName.value.length === 0) {
      textMessageIncorrect.innerText = 'Nombre invalido';
      divMessageAlertIncorrect.style.display = 'flex';
    } else if (!f.validyEmail(inputEmail.value)) {
      textMessageIncorrect.innerText = 'Correo invalido';
      divMessageAlertIncorrect.style.display = 'flex';
    } else if (inputPassword.value.length < 6) {
      textMessageIncorrect.innerText = 'Contraseña invalida / (min: 6) ';
      divMessageAlertIncorrect.style.display = 'flex';
    } else if (inputPassword.value !== inputConfirmPassword.value) {
      textMessageIncorrect.innerText = 'Confirmar contraseña diferente';
      divMessageAlertIncorrect.style.display = 'flex';
    } else {
      resultRegister();
    }
  });
  buttonMessageAlertContent.addEventListener('click', () => { onNavigate('/'); });
  buttonMessageAlertContentIncorrect.addEventListener('click', () => { divMessageAlertIncorrect.style.display = 'none'; });

  return sectionRegister;
};
