import './Perfil_empresa_int.css';
import Noticiero from './components/Noticiero';
import { LineaHor } from './components/LineaHor';
import { DescripcionInt } from './components/DescripcionInt';
import { Nombre } from './components/Nombre';
import CrearAnuncio from './components/CrearAnuncio';

function Perfil_empresa_int() {
  // 🎯 Definir getCookie dentro del componente App
  const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return JSON.parse(cookie.substring(name.length, cookie.length));
      }
    }
    return "";
  };

  return (
    <div className="perfil_empresa_int">
      <div className='pantalla'>
        <div className='primeraInfo'>
          <div className='apariencia'>
            <div className='imagen'></div>
            {/* Pasar getCookie como prop al componente Nombre */}
            <Nombre getCookie={getCookie} />
          </div>
          <div className='interacciones'>
            <button id='mensaje'></button>
            <button id='guardar'></button>
          </div>
        </div>
        <LineaHor />
        <div id='infoAdicional'>
          <div id='fotoGrande'></div>
          <DescripcionInt />
        </div>
        <LineaHor />
        <div id='introPosteos'>
          <h3>Anuncios</h3>
          <CrearAnuncio />
        </div>
        <div id='posteos'>

        </div>
      </div>



      <Noticiero />
    </div>
  );
}

export default Perfil_empresa_int;
