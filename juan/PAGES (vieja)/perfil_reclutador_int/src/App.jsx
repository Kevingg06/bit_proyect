import './App.css';
import { LineaHor } from './components/LineaHor';
import { LineaVer } from './components/LineaVer';
import { Nombre } from './components/Nombre';
import { Descripcion } from './components/Descripcion';
import { Posteo } from './components/Posteo';
import Noticiero from './components/Noticiero';
import CrearPosteo from './components/CrearPosteo'

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
            <Descripcion />
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
      </header>
    </div>
  );
}

export default App;
