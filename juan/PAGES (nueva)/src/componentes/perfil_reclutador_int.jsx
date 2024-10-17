import './Perfil_reclutador_int.css';
import { LineaHor } from './components/LineaHor';
import { LineaVer } from './components/LineaVer';
import { Nombre } from './components/Nombre';
import { DescripcionInt } from './components/DescripcionInt';
import { Posteo } from './components/Posteo';
import Noticiero from './components/Noticiero';
import CrearPosteo from './components/CrearPosteo'

function Perfil_reclutador_int() {
  return (
    <div className="perfil_reclutador_int">
      <div className='pantalla'>
        <div className='primeraInfo'>
          <div className='apariencia'>
            <div className='imagen'></div>
            {/* <Nombre /> */}
          </div>
          <div className='interacciones'>
            <button id='mensaje'></button>
            <button id='guardar'></button>
          </div>
        </div>
        <LineaHor />
        <div id='infoAdicional'>
          <DescripcionInt />
        </div>
        <LineaHor />
        <div id='introPosteos'>
          <h3>Posteos</h3>
          <CrearPosteo />
        </div>
        <div id='posteos'>
          <Posteo />
        </div>
      </div>



      <Noticiero />
    </div>
  );
}

export default Perfil_reclutador_int;
