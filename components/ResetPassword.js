// eslint-disable-next-line import/no-cycle
import { restorePassword } from '../lib/auth.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../Router.js';

export const ResetPassword = () => {
  const sectionRestPassword = document.createElement('section');
  sectionRestPassword.className = 'section-configuration';
  const mainSection = document.createElement('div');
  mainSection.className = 'container-configuration';

  const mainResset = document.createElement('div');
  mainResset.className = 'text-center';

  const titleHeader = document.createElement('h2');
  titleHeader.className = 'text-center';
  titleHeader.id = 'titlePage';
  titleHeader.innerText = 'Recupera tu cuenta';

  const instruction = document.createElement('p');
  instruction.innerText = 'Ingresa tu correo electrónico  para buscar tu cuenta.';
  const inputCorreo = document.createElement('input');
  inputCorreo.type = 'text';
  inputCorreo.autocomplete = 'off';
  inputCorreo.className = 'input-reset';
  inputCorreo.name = 'txtUser';
  inputCorreo.id = 'txtCorreo';
  inputCorreo.placeholder = 'Correo electrónico';
  const buttonRecuperarCuenta = document.createElement('button');
  buttonRecuperarCuenta.className = 'button-form';
  buttonRecuperarCuenta.id = 'buttonResetPassword';
  buttonRecuperarCuenta.innerText = 'Continuar ';
  const buttonReturn = document.createElement('button');
  buttonReturn.className = 'button-form';
  buttonReturn.id = 'buttonReturnReset';
  buttonReturn.innerText = 'Regresar';
  buttonReturn.addEventListener('click', () => (onNavigate('/feed')));
  // creando div oculto
  const divHideMessage = document.createElement('div');
  divHideMessage.id = 'messageHideCorreo';
  const messageError = document.createElement('p');
  messageError.innerText = 'Tiene que ingresar un correo válido';
  messageError.id = 'messageError';
  divHideMessage.style.display = 'none';
  divHideMessage.appendChild(messageError);

  sectionRestPassword.appendChild(mainSection);
  mainSection.appendChild(divHideMessage);
  mainSection.appendChild(mainResset);
  mainResset.appendChild(titleHeader);
  mainResset.appendChild(instruction);
  mainResset.appendChild(inputCorreo);
  mainResset.appendChild(buttonRecuperarCuenta);
  mainResset.appendChild(buttonReturn);

  buttonRecuperarCuenta.addEventListener('click', () => {
    const valueEmail = inputCorreo.value;
    if (valueEmail.length < 8) {
      divHideMessage.style.display = 'block';
    } else {
      restorePassword(valueEmail, messageError);
      onNavigate('/');
    }
  });
  return sectionRestPassword;
};
