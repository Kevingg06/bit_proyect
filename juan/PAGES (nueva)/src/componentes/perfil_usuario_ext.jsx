import './App.css';
import DiaDisponible from './components/DiaDisponible';
import { LineaHor } from './components/LineaHor';
import { LineaVer } from './components/LineaVer';
import { Nombre } from './components/Nombre';
import { TitulosExt } from './components/TitulosExt';
import TablaHorariosExt from './components/TablaExt';
import { DescripcionExt } from './components/DescripcionExt';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
