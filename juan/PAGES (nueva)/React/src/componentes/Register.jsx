import React, { useEffect, useState } from 'react';
import estilos from './Register.module.css';

function Register() {
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

  const handleButtonClick = (tipo) => {
    setActiveScreen(tipo);
  };

  const handleBackClick = () => {
    setActiveScreen('eleccion');
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDatos((prevDatos) => ({ ...prevDatos, [id]: value }));
  };

  const enviarDatos = async (tipo) => {
    const url = tipo === 'empresa' ? 'http://localhost:3001/' : 'http://localhost:5500/register';
    const data = {
      nombre: datos[`nombre_${tipo}`],
      email: datos[`email_${tipo}`],
      ...(tipo === 'empresa' ? { cuit: datos.cuit_empresa } : { edad: datos.edad_empleado }),
      contraseña1: datos[`contraseña1_${tipo}`],
      contraseña2: datos[`contraseña2_${tipo}`],
    };

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
        window.location.href = 'http://localhost:3000/';
      } catch (error) {
        console.error('Error al enviar datos a la API:', error);
        alert("El envío de datos a la API falló.");
      }
    } else {
      setError('Validación de datos fallida');
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
    <div id='register'>
      <div id="fondo_2"></div>
      <div id="fondo_1"></div>
      {activeScreen === 'empleado' && (
        <div className={estilos.pantalla} id={estilos.root_empleado}>
          <h1>Empieza a expandir tus posibilidades</h1>
          <p>Primero necesitamos recopilar algunos datos</p>
          <form className={estilos.formulario} id={estilos.form_empleado}>
            <input id={estilos.nombre_empleado} type="text" placeholder="NOMBRE Y APELLIDO" value={datos.nombre_empleado} onChange={handleInputChange} />
            <input id={estilos.email_empleado} type="email" placeholder="EMAIL" required value={datos.email_empleado} onChange={handleInputChange} />
            <input id={estilos.edad_empleado} type="number" placeholder="EDAD" value={datos.edad_empleado} onChange={handleInputChange} />
            <input id={estilos.contraseña1_empleado} type="password" placeholder="CONTRASEÑA (mínimo 8 caracteres)" value={datos.contraseña1_empleado} onChange={handleInputChange} />
            <input id={estilos.contraseña2_empleado} type="password" placeholder="CONFIRMAR CONTRASEÑA" value={datos.contraseña2_empleado} onChange={handleInputChange} />
            <p className={estilos.aclaracion}>
              Al hacer clic en «ACEPTAR Y CONTINUAR», aceptas las Condiciones de uso, la Política de privacidad y la Política de cookies de Hire-Me.
            </p>
            <button type="button" onClick={() => enviarDatos('empleado')}>ACEPTAR Y CONTINUAR</button>
          </form>
          <a href="#">¿Ya tenés una cuenta? Iniciá sesión</a>
          <button className={estilos.google}>
            <img src="logo_google.jpg" alt="Google logo" />
            <span>INGRESAR CON GOOGLE</span>
          </button>
          <button className={estilos.volver} onClick={handleBackClick}>VOLVER</button>
        </div>
      )}

      {activeScreen === 'empresa' && (
        <div className={estilos.pantalla} id={estilos.root_empresa}>
          <h1>Empieza a expandir tus posibilidades</h1>
          <p>Primero necesitamos recopilar algunos datos</p>
          <form className={estilos.formulario} id={estilos.form_empresa}>
            <input id={estilos.nombre_empresa} type="text" placeholder="NOMBRE DE LA EMPRESA" value={datos.nombre_empresa} onChange={handleInputChange} />
            <input id={estilos.email_empresa} type="email" placeholder="EMAIL" required value={datos.email_empresa} onChange={handleInputChange} />
            <input id={estilos.cuit_empresa} type="text" placeholder="CUIT" value={datos.cuit_empresa} onChange={handleInputChange} />
            <input id={estilos.contraseña1_empresa} type="password" placeholder="CONTRASEÑA (mínimo 8 caracteres)" value={datos.contraseña1_empresa} onChange={handleInputChange} />
            <input id={estilos.contraseña2_empresa} type="password" placeholder="CONFIRMAR CONTRASEÑA" value={datos.contraseña2_empresa} onChange={handleInputChange} />
            <p className="aclaracion">
              Al hacer clic en «ACEPTAR Y CONTINUAR», aceptas las Condiciones de uso, la Política de privacidad y la Política de cookies de Hire-Me.
            </p>
            <button type="button" onClick={() => enviarDatos('empresa')}>ACEPTAR Y CONTINUAR</button>
          </form>
          <a href="#">¿Ya tenés una cuenta? Iniciá sesión</a>
          <button className={estilos.google}>
            <img src="logo_google.jpg" alt="Google logo" />
            <span>INGRESAR CON GOOGLE</span>
          </button>
          <button className={estilos.volver} onClick={handleBackClick}>VOLVER</button>
        </div>
      )}

      {activeScreen === 'eleccion' && (
        <div className={estilos.pantalla} id={estilos.root_eleccion}>
          <h2>¿PARA QUÉ UTILIZARÁ SU CUENTA?</h2>
          <button className={estilos.btnEleccion} onClick={() => handleButtonClick('empleado')}>EMPLEADO</button>
          <button className={estilos.btnEleccion} onClick={() => handleButtonClick('empresa')}>EMPRESA</button>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Register;
