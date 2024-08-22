import './App.css';
import { Formulario } from './components/Formulario';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Fondo de la página */}
        <div id="fondo_2"></div>
        <div id="fondo_1"></div>

        {/* Contenedor principal */}
        <div className="pantalla">
          <h1>INICIAR SESIÓN</h1>  {/* Título principal */}

          {/* Formulario de inicio de sesión */}
          <Formulario></Formulario>
        </div>
      </header>
    </div>
  );
}

export default App;