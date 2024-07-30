import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DiaDisponible from './components/DiaDisponible';
import { LineaHor } from './components/LineaHor';
import { LineaVer } from './components/LineaVer';
import Nombre from './components/Nombre'; 
import { Titulos } from './components/Titulos';
import TablaHorarios from './components/Tabla';
import { Descripcion } from './components/Descripcion';
import Login from '../../INICIO_SESION/JS/login';  // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={ 
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
                    <h3>Mi descripción</h3>
                    <Descripcion />
                  </div>
                </div>
                <LineaHor />
                <h3>Horarios disponibles</h3>
                <div id='calendario'>
                  <div className='horarios'>
                    <TablaHorarios />
                  </div>
                  <div className='dias'>
                    <DiaDisponible text='Lunes' />
                    <DiaDisponible text='Martes' />
                    <DiaDisponible text='Miercoles' />
                    <DiaDisponible text='Jueves' />
                    <DiaDisponible text='Viernes' />
                    <DiaDisponible text='Sábado' />
                    <DiaDisponible text='Domingo' />
                  </div>
                </div>
              </div>
            </header>
          </div>
        } /> 
        {/* ... otras rutas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;