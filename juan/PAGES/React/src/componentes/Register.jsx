import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import estilos from './Register.module.css';

function Register() {

  const navigate = useNavigate(); // Llamar al hook dentro del componente


  const [activeScreen, setActiveScreen] = useState('eleccion');
  const [datos, setDatos] = useState({
    nombre_empleado: '',
    email_empleado: '',
    edad_empleado: '',
    contraseña1_empleado: '',
    contraseña2_empleado: '',
    nombre_empresa: '',
    email_empresa: '',
    cuit_empresa: '',
    contraseña1_empresa: '',
    contraseña2_empresa: '',
  });
  const [error, setError] = useState('');

  const nombreRef = useRef();
  const emailRef = useRef();
  const edadRef = useRef();
  const contraseña1Ref = useRef();
  const contraseña2Ref = useRef();

  const handleButtonClick = (tipo) => {
    setActiveScreen(tipo);
  };

  const handleBackClick = () => {
    setActiveScreen('eleccion');
  };

  const enviarDatos = async (tipo) => {
    const url = tipo === 'empresa' ? 'http://localhost:5500/' : 'http://localhost:5500/register';

    // Capturar datos desde refs
    const data = {
      nombre: tipo === 'empleado' ? nombreRef.current.value : datos.nombre_empresa,
      email: tipo === 'empleado' ? emailRef.current.value : datos.email_empresa,
      ...(tipo === 'empresa' ? { cuit: datos.cuit_empresa } : { edad: edadRef.current.value }),
      contraseña1: tipo === 'empleado' ? contraseña1Ref.current.value : datos.contraseña1_empresa,
      contraseña2: tipo === 'empleado' ? contraseña2Ref.current.value : datos.contraseña2_empresa,
    };

    // Actualizar estado si es necesario
    if (tipo === 'empleado') {
      setDatos(prevDatos => ({
        ...prevDatos,
        nombre_empleado: data.nombre,
        email_empleado: data.email,
        edad_empleado: data.edad,
        contraseña1_empleado: data.contraseña1,
        contraseña2_empleado: data.contraseña2,
      }));
    }

    // Validar y enviar
    if (validarDatos(data) && validarContraseña(data.contraseña1) && segundaContraseña(data.contraseña1, data.contraseña2)) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('La solicitud no fue exitosa');
        const result = await response.json();
        console.log('Respuesta de la API:', result);
        if (tipo === 'empleado') {
          navigate("/perfilUsuarioInt")
        } else {
          navigate("/perfilEmpresaInt")
        };
      } catch (error) {
        console.error('Error al enviar datos a la API:', error);
        alert("El envío de datos a la API falló.");
      }
    }
  };

  const validarDatos = (datos) => {
    const regex = /[,*()]/g;
    for (let key in datos) {
      if (datos[key].trim() === "" || regex.test(datos[key].trim())) {
        alert("Por favor, llene todos los campos correctamente.");
        return false;
      }
    }
    return true;
  };

  const validarContraseña = (contraseña) => {
    const expresionRegular = /^[a-zA-Z0-9]{8,20}$/;
    if (!expresionRegular.test(contraseña)) {
      alert('La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.');
      return false;
    }
    return true;
  };

  const segundaContraseña = (contraseña, contraseña2) => {
    if (contraseña !== contraseña2) {
      alert("Las contraseñas deben ser iguales");
      return false;
    }
    return true;
  };

  useEffect(() => {
    console.log("Pantalla activa:", activeScreen);
  }, [activeScreen]);

  return (
    <div id={estilos.register}>
      <div id={estilos.fondo_2}></div>
      <div id={estilos.fondo_1}></div>

      <div id={estilos.titulos}>
        <h2>Empieza a expandir tus posibilidades</h2>
        <p>Primero necesitamos recopilar algunos datos</p>
        <p className={estilos.aclaracion}>
          Al hacer clic en «ACEPTAR Y CONTINUAR», aceptas las Condiciones de uso, la Política de privacidad y la Política de cookies de Hire-Me.
        </p>
      </div>

      {activeScreen === 'empleado' && (
        <div className={estilos.pantalla} id={estilos.root_empleado}>
          <form className={estilos.formulario} id={estilos.form_empleado}>
            <input ref={nombreRef} type="text" placeholder="NOMBRE Y APELLIDO" required />
            <input ref={emailRef} type="email" placeholder="EMAIL" required />
            <input ref={edadRef} type="number" placeholder="EDAD" required />
            <input ref={contraseña1Ref} type="password" placeholder="CONTRASEÑA (mínimo 8 caracteres)" required />
            <input ref={contraseña2Ref} type="password" placeholder="CONFIRMAR CONTRASEÑA" required />
            <button className={estilos.ingresar} type="button" onClick={() => enviarDatos('empleado')}>ACEPTAR Y CONTINUAR</button>
          </form>
          <button className={estilos.google}>
            <img src="logo_google.jpg" alt="Google logo" />
            <span>INGRESAR CON GOOGLE</span>
          </button>
          <div className={estilos.links}>
            <button className={estilos.volver} onClick={handleBackClick}>VOLVER</button>
            <Link to="/login">¿Ya tenés una cuenta? Iniciá sesión</Link>
          </div>
        </div>
      )}

      {activeScreen === 'empresa' && (
        <div className={estilos.pantalla} id={estilos.root_empresa}>
          <form className={estilos.formulario} id={estilos.form_empresa}>
            <input type="text" placeholder="NOMBRE DE LA EMPRESA" required />
            <input type="email" placeholder="EMAIL" required />
            <input type="text" placeholder="CUIT" required />
            <input type="password" placeholder="CONTRASEÑA (mínimo 8 caracteres)" required />
            <input type="password" placeholder="CONFIRMAR CONTRASEÑA" required />
            <button className={estilos.ingresar} type="button" onClick={() => enviarDatos('empresa')}>ACEPTAR Y CONTINUAR</button>
          </form>
          <button className={estilos.google}>
            <img src="logo_google.jpg" alt="Google logo" />
            <span>INGRESAR CON GOOGLE</span>
          </button>
          <div className={estilos.links}>
            <button className={estilos.volver} onClick={handleBackClick}>VOLVER</button>
            <Link to="/login">¿Ya tenés una cuenta? Iniciá sesión</Link>
          </div>
        </div>
      )}

      {activeScreen === 'eleccion' && (
        <div className={estilos.pantalla} id={estilos.root_eleccion}>
          <h2>¿PARA QUÉ UTILIZARÁ SU CUENTA?</h2>
          <button className={estilos.btnEleccion} onClick={() => handleButtonClick('empleado')}>EMPLEADO</button>
          <button className={estilos.btnEleccion} onClick={() => handleButtonClick('empresa')}>EMPRESA</button>
        </div>
      )}
    </div>
  );
}

export default Register;