import './App.css';
import Noticiero from './components/Noticiero';
import { LineaHor } from './components/LineaHor';
import { Descripcion } from './components/Descripcion';
import { Nombre } from './components/Nombre';
import CrearAnuncio from './components/CrearAnuncio';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
            <div id='fotoGrande'></div>
            <Descripcion />
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
      </header>
    </div>
  );
}

export default App;
