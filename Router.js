// eslint-disable-next-line import/no-cycle
import { Register } from './components/Register.js';
// eslint-disable-next-line import/no-cycle
import { Login } from './components/Login.js';
// eslint-disable-next-line import/no-cycle
import { Feed } from './components/Feed.js';
// eslint-disable-next-line import/no-cycle
import { Profile } from './components/Profile.js';
// eslint-disable-next-line import/no-cycle
import { Configurar } from './components/Configurar.js';
// eslint-disable-next-line import/no-cycle
import { ResetPassword } from './components/ResetPassword.js';

export function elementRoot() {
  if (document.getElementById('root') == null) {
    document.body.innerHTML = '<div id="root"> </div>';
  }
}
elementRoot();
const rootDiv = document.getElementById('root');

export const routes = {
  '/': Login,
  '/register': Register,
  '/feed': Feed,
  '/profile': Profile,
  '/configurar': Configurar,
  '/resetPassword': ResetPassword,
};

export const onNavigate = (pathname) => {
  // pushtate actualiza barra de navegacion(método viene de API.History/navegador)
  // trabaja en conjunto con el evento onpopstate
  // actualiza url
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  // actualiza la vista actual segun la ruta
  rootDiv.appendChild(routes[pathname]());
};

const component = routes[window.location.pathname]; // cambio de ruta
// alamacena vista anterior
window.onpopstate = () => rootDiv.appendChild(component());
rootDiv.appendChild(component());
