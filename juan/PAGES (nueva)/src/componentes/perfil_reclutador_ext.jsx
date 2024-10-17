import './Perfil_reclutador_ext';
import { LineaHor } from './components/LineaHor';
import { LineaVer } from './components/LineaVer';
import { Nombre } from './components/Nombre';
import { DescripcionExt } from './components/DescripcionExt';
import { Posteo } from './components/Posteo';
import Noticiero from './components/Noticiero';

function Perfil_reclutador_ext() {
  return (
    <div className="perfil_reclutador_ext">
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
          <DescripcionExt />
        </div>
        <LineaHor />
        <div id='introPosteos'>
          <h3>Posteos</h3>
        </div>
        <div id='posteos'>
          <Posteo />
        </div>
      </div>



      <Noticiero />
    </div>
  );
}

export default Perfil_reclutador_ext;
