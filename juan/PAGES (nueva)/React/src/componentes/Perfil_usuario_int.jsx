import estilos from './Perfil_usuario_int.module.css';
import DiaDisponible from './DiaDisponible';
import { LineaHor } from './LineaHor';
import { LineaVer } from './LineaVer';
import { Nombre } from './Nombre'; 
import { TitulosInt } from './TitulosInt';
import TablaHorariosInt from './/TablaInt';
import { DescripcionInt } from './DescripcionInt';

function Perfil_usuario_int() { 
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
    <div className="perfil_usuario_int">
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
            <div id='titulos'>
              <TitulosInt />
            </div>
            <LineaVer />
            <div id='descripcion'>
              <DescripcionInt />
            </div>
          </div>
          <LineaHor />
          <h3>Horarios disponibles</h3>
          <div id='calendario'>
            <div className='horarios'>
              <TablaHorariosInt />
            </div>
          </div>
        </div>
    </div>
  );
}

export default Perfil_usuario_int;