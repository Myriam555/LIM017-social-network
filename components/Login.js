/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import { accesUser, accesGoogle } from '../lib/auth.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../Router.js';

export const Login = () => {
  const divLogin = document.createElement('section');
  divLogin.className = 'full-page login-page';
  const divContainer = document.createElement('div');
  divContainer.className = 'container';
  const divCard = document.createElement('div');
  divCard.className = 'card';

  const divCardHeader = document.createElement('div');
  divCardHeader.className = 'card-header text-center';
  const imgLogo = document.createElement('img');
  imgLogo.className = 'img-login';
  imgLogo.src = 'img/logo4.png';

  const title = document.createElement('h2');
  title.className = 'text-center';
  title.innerText = 'Iniciar Sesión';

  // creando div oculto
  const divHide = document.createElement('div');
  divHide.id = 'messageHide';
  const messageError = document.createElement('p');
  messageError.innerText = 'Usuario o contraseña no válido';
  divHide.appendChild(messageError);

  const divCardContent = document.createElement('div');
  divCardContent.className = 'card-content';

  const inputGroupUser = document.createElement('div');
  inputGroupUser.className = 'input-group';
  const spanIcoUser = document.createElement('span');
  spanIcoUser.className = 'input-group-ico';
  const icoUser = document.createElement('i');
  icoUser.className = 'ico-user';
  const labelUser = document.createElement('label');
  labelUser.className = 'control-label text-center';
  labelUser.innerText = 'Ingrese su correo';
  const inputUser = document.createElement('input');
  inputUser.type = 'text';
  inputUser.autocomplete = 'off';
  inputUser.className = 'input-login';
  inputUser.name = 'txtUser';
  inputUser.id = 'txtUser';

  const inputGroupPassword = document.createElement('div');
  inputGroupPassword.className = 'input-group';
  const spanIcoPassword = document.createElement('span');
  spanIcoPassword.className = 'input-group-ico';
  const icoPassword = document.createElement('i');
  icoPassword.className = 'ico-lock';
  const labelPassword = document.createElement('label');
  labelPassword.className = 'control-label';
  labelPassword.innerText = 'Ingrese su contraseña';
  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.autocomplete = 'off';
  inputPassword.className = 'input-login';
  inputPassword.name = 'txtPassword';
  inputPassword.id = 'txtPassword';

  // iconos de google
  const divIcon = document.createElement('div');
  divIcon.className = 'div-icons-google-fb';
  const icoGoogle = document.createElement('i');
  icoGoogle.className = 'icon-google';
  icoGoogle.addEventListener('click', () => (accesGoogle()));
  divIcon.appendChild(icoGoogle);

  const divCardFooter = document.createElement('div');
  divCardFooter.className = 'text-center';
  const buttonLogIn = document.createElement('button');
  buttonLogIn.className = 'button-form';
  buttonLogIn.innerText = 'Iniciar sesión';
  buttonLogIn.id = 'btnLogin';
  // evento del boton Login
  buttonLogIn.addEventListener('click', () => (accesUser(inputUser.value, inputPassword.value)));
  const buttonSignUp = document.createElement('button');
  buttonSignUp.className = 'button-form';
  buttonSignUp.id = 'buttonSignUp';
  buttonSignUp.innerText = 'Registrarse';
  // evento del boton sing up(registrarse)
  buttonSignUp.addEventListener('click', () => onNavigate('/register'));
  const linkLogin = document.createElement('a');
  linkLogin.id = 'linkLogin';
  linkLogin.className = 'link-login';
  // linkLogin.href = '#';
  linkLogin.innerText = '¿Olvidaste tu contraseña?';
  linkLogin.addEventListener('click', () => onNavigate('/resetPassword'));

  divCardHeader.appendChild(imgLogo);

  spanIcoUser.appendChild(icoUser);
  inputGroupUser.appendChild(spanIcoUser);
  inputGroupUser.appendChild(labelUser);
  inputGroupUser.appendChild(inputUser);

  spanIcoPassword.appendChild(icoPassword);
  inputGroupPassword.appendChild(spanIcoPassword);
  inputGroupPassword.appendChild(labelPassword);
  inputGroupPassword.appendChild(inputPassword);

  divCardContent.appendChild(inputGroupUser);
  divCardContent.appendChild(inputGroupPassword);
  divCardContent.appendChild(divIcon);

  divCardFooter.appendChild(buttonLogIn);
  divCardFooter.appendChild(buttonSignUp);
  divCardFooter.appendChild(linkLogin);

  divCard.appendChild(divCardHeader);
  divCard.appendChild(title);
  divCard.appendChild(divHide);
  divCard.appendChild(divCardContent);
  divCard.appendChild(divCardFooter);

  divContainer.appendChild(divCard);
  divLogin.appendChild(divContainer);
  return divLogin;
};
