import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './componentes/Login';
import Register from './componentes/Register.jsx';
import Perfil_usuario_int from './componentes/Perfil_usuario_int';
import Perfil_usuario_ext from './componentes/Perfil_usuario_ext';

// Componentes de cada página
function Home() {
  return <h2>Home</h2>;
}

function Contact() {
  return <h2>Contact</h2>;
}



function App() {


  return (
    // <Router>
    //   <nav>
    //     {/* Enlaces de navegación */}
    //     <Link to="/home">Home</Link>
    //     <Link to="/login">Login</Link>
    //     <Link to="/register">Register</Link>
    //     <Link to="/contact">Contact</Link>
    //   </nav>


    //   <Routes>
    //     {/* Definición de rutas */}
    //     <Route path="/home" element={<Home />} />
    //     {/* <Route path="/login" element={<Perfil_usuario_int />} /> */}
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/contact" element={<Contact />} />
    //   </Routes>
    // </Router>

    <Register />
  );
}

export default App;