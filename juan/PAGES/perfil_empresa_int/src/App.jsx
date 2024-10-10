import './App.css';
import Noticiero from './components/Noticiero';
import { LineaHor } from './components/LineaHor';
import { Descripcion } from './components/Descripcion';

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
          <h3>Posteos</h3>
          <div id='posteos'>
          </div>
        </div>



        <Noticiero />
      </header>
    </div>
  );
}

export default App;
