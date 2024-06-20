import './App.css';
import { ComponentePrueba } from './components/ComponentePrueba';
import { LineaHor } from './components/LineaHor';
import { LineaVer } from './components/LineaVer';
import TablaHorarios from './components/Tabla';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='pantalla'>
          <div className='primeraInfo'>
            <div className='imagen'></div>
            <p id='nombre'>Nombre Apellido</p>
            <button id='mensaje'></button>
            <button id='guardar'></button>
          </div>
          <LineaHor />
          <div id='infoAdicional'>
            <div id='titulos'>
              <h3>Títulos</h3>
              <p>Todavía no has añadido títulos</p>
            </div>
            <LineaVer />
            <div id='descripcion'>
              <h3>Mi descripción</h3>
              <p>Todavía no has añadido una descripción</p>
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
