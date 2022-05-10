// eslint-disable-next-line import/no-cycle
import { configurationPassword } from '../lib/auth.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../Router.js';

export const Configurar = () => {
  const sectionChangePassword = document.createElement('section');
  sectionChangePassword.className = 'section-configuration';
  sectionChangePassword.id = 'sectionConfiguration';
  const divChangePassword = document.createElement('div');
  divChangePassword.className = 'container-configuration';
  const divCardHide = document.createElement('div');
  divCardHide.className = 'card-hide';
  divCardHide.id = 'cardHide';
  divCardHide.style.display = 'none';

  const titleChangePassword = document.createElement('h2');
  titleChangePassword.className = 'text-center';
  titleChangePassword.innerText = 'Cambiar Contraseña';

  const labelPasswordCurrent = document.createElement('label');
  labelPasswordCurrent.className = 'control-label-configuration';
  labelPasswordCurrent.innerText = 'Ingrese su contraseña Actual';
  const inputPasswordCurrent = document.createElement('input');
  inputPasswordCurrent.type = 'password';
  inputPasswordCurrent.id = 'txtPasswordCurrent';

  const labelPasswordNew = document.createElement('label');
  labelPasswordNew.className = 'control-label-configuration';
  labelPasswordNew.innerText = 'Ingrese su Nueva contraseña';
  const inputPasswordNew = document.createElement('input');
  inputPasswordNew.type = 'password';
  inputPasswordNew.id = 'txtPasswordNew';

  const labelPasswordNewRepeat = document.createElement('label');
  labelPasswordNewRepeat.className = 'control-label-configuration';
  labelPasswordNewRepeat.innerText = 'Repita su Nueva contraseña';
  const inputPasswordNewRepeat = document.createElement('input');
  inputPasswordNewRepeat.type = 'password';
  inputPasswordNewRepeat.id = 'txtPasswordNewRepeat';

  const divEditPassword = document.createElement('div');
  divEditPassword.className = 'text-center button-center';
  const buttonSaveChanges = document.createElement('button');
  buttonSaveChanges.className = 'button-form-configuration';
  buttonSaveChanges.id = 'buttonConfiguration';
  buttonSaveChanges.innerText = 'Guardar cambios ';
  buttonSaveChanges.addEventListener('click', () => (configurationPassword()));

  const buttonReturn = document.createElement('button');
  buttonReturn.className = 'button-form-configuration';
  buttonReturn.id = 'buttonReturn';
  buttonReturn.innerText = 'Regresar';
  buttonReturn.addEventListener('click', () => (onNavigate('/feed')));
  sectionChangePassword.appendChild(divCardHide);
  sectionChangePassword.appendChild(divChangePassword);
  divChangePassword.appendChild(titleChangePassword);
  divChangePassword.appendChild(labelPasswordCurrent);
  labelPasswordCurrent.appendChild(inputPasswordCurrent);
  divChangePassword.appendChild(labelPasswordNew);
  labelPasswordNew.appendChild(inputPasswordNew);
  divChangePassword.appendChild(labelPasswordNewRepeat);
  labelPasswordNewRepeat.appendChild(inputPasswordNewRepeat);
  divChangePassword.appendChild(divEditPassword);
  divEditPassword.appendChild(buttonSaveChanges);
  divEditPassword.appendChild(buttonReturn);

  return sectionChangePassword;
};
