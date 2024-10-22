import estilos from './Perfil_usuario_ext.module.css';
import DiaDisponible from './DiaDisponible';
import { LineaHor } from './LineaHor';
import { LineaVer } from './LineaVer';
import { Nombre } from './Nombre';
import { TitulosExt } from './TitulosExt';
import TablaHorariosExt from './TablaExt';
import { DescripcionExt } from './DescripcionExt';

function Perfil_usuario_ext() {
  return (
    <div className="perfil_usuario_ext">
        <div className='pantalla'>
          <div className='primeraInfo'>
            <div className='apariencia'>
              <div className='imagen'></div>
              <Nombre />
            </div>
            <div className='interacciones'>
              <button id='mensaje'></button>
              <button id='guardar'></button>
            </div>
          </div>
          <LineaHor />
          <div id='infoAdicional'>
            <div id='titulos'>
              <TitulosExt />
            </div>
            <LineaVer />
            <div id='descripcion'>
              <DescripcionExt />
            </div>
          </div>
          <LineaHor />
          <h3>Horarios disponibles</h3>
          <div id='calendario'>
            <div className='horarios'>
              <TablaHorariosExt />
            </div>
          </div>
        </div>
    </div>
  );
}

export default Perfil_usuario_ext;
