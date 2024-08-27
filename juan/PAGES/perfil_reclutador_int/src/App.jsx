import './App.css';
import { LineaHor } from './components/LineaHor';
import { LineaVer } from './components/LineaVer';
import { Nombre } from './components/Nombre';
import { Descripcion } from './components/Descripcion';
import { Noticia } from './components/Noticia'

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
            <Descripcion />
          </div>
          <LineaHor />
          <h3>Posteos</h3>
          <div id='calendario'>
            <div className='horarios'>
              {/* <TablaHorarios /> */}
            </div>
          </div>
        </div>



        <div className='noticiero'>
          <div className='miniTitulo'>
            <p>Puede ser de tu interes</p>
          </div>
          <Noticia />
          <Noticia />
          <Noticia />
          <Noticia />
          <Noticia />
          <Noticia />
          <Noticia />
        </div>
      </header>
    </div>
  );
}

export default App;
