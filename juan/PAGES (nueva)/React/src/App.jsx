import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Login from './componentes/Login';
import Register from './componentes/Register.jsx';
import Perfil_usuario_int from './componentes/Perfil_usuario_int';
import Perfil_usuario_ext from './componentes/Perfil_usuario_ext';
import Perfil_reclutador_int from './componentes/Perfil_reclutador_int';
import Perfil_reclutador_ext from './componentes/Perfil_reclutador_ext';
import Perfil_empresa_int from './componentes/Perfil_empresa_int';
import LandingPage from './componentes/LandingPage';
import RecuperarContra from './componentes/RecuperarContra';
import Ayuda from './componentes/Ayuda';


function App() {
  return (
    <Router>
      <nav style={{display:'flex', zIndex: '50', justifyContent: 'space-between', width: '100%', height: '30px' }}>
        {/* Enlaces de navegación */}
        <Link to="/landingPage">Landing Page</Link>

        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        <Link to="/recuperarContra">Recuperar Contraseña</Link>
        <Link to="/ayuda">AYUDA</Link>

        <Link to="/perfilUsuarioInt">Perfil Usuario int</Link>
        <Link to="/perfilUsuarioExt">Perfil Usuario ext</Link>

        <Link to="/perfilReclutadorInt">Perfil Reclutador int</Link>
        <Link to="/perfilReclutadorExt">Perfil Reclutador ext</Link>

        <Link to="/perfilEmpresaInt">Perfil Empresa int</Link>
      </nav>

        <Routes>
          {/* Definición de rutas */}
          <Route path="/LandingPage" element={<LandingPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/recuperarContra" element={<RecuperarContra />} />
          <Route path="/ayuda" element={<Ayuda />} />

          <Route path="/perfilUsuarioInt" element={<Perfil_usuario_int />} />
          <Route path="/perfilUsuarioExt" element={<Perfil_usuario_ext />} />

          <Route path="/perfilReclutadorInt" element={<Perfil_reclutador_int />} />
          <Route path="/perfilReclutadorExt" element={<Perfil_reclutador_ext />} />


          <Route path="/perfilEmpresaInt" element={<Perfil_empresa_int />} />
        </Routes>
    </Router>
  );
}

export default App;