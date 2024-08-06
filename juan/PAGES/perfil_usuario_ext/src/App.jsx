import './App.css';
import DiaDisponible from './components/DiaDisponible';
import { LineaHor } from './components/LineaHor';
import { LineaVer } from './components/LineaVer';
import { Nombre } from './components/Nombre';
import { Titulos } from './components/Titulos';
import TablaHorarios from './components/Tabla';
import { Descripcion } from './components/Descripcion';

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
              <h3>Títulos</h3>
              <Titulos />
            </div>
            <LineaVer />
            <div id='descripcion'>
              
              <Descripcion />
            </div>
          </div>
          <LineaHor />
          <h3>Horarios disponibles</h3>
          <div id='calendario'>
            <div className='horarios'>
              <TablaHorarios />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
