import React, { useEffect, useRef } from 'react';

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {

  const navigate = useNavigate(); // Llamar al hook dentro del componente


  const passwordInputRef = useRef(null);
  const mostrarContraRef = useRef(null);
  const emailRef = useRef(null);
  const ingresarRef = useRef(null);
  const formularioRef = useRef(null);  // Nueva referencia al formulario

  // Definir las funciones fuera del useEffect
  const mostrarContraseña = () => {
    const passwordInput = passwordInputRef.current;
    const mostrarContra = mostrarContraRef.current;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      mostrarContra.textContent = "Ocultar";
    } else {
      passwordInput.type = "password";
      mostrarContra.textContent = "Mostrar";
    }
  };

  const enviarDatos = () => {
    const emailUsuario = emailRef.current.value;
    const contraseñaUsuario = passwordInputRef.current.value;

    var datos = {
      email: emailUsuario,
      contraseña: contraseñaUsuario
    };

    const inputs = formularioRef.current.getElementsByTagName("input"); // Usar ref para el formulario

    if (datosVacios(inputs) && validarDatos(inputs) && validarContraseña(contraseñaUsuario)) {
      console.log('Todos los datos son correctos. Enviando datos...');

      fetch('http://localhost:5500/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
          }
          return response.json();
        })
        .then(data => {
          console.log('Respuesta de la API:', data);
          navigate("/perfilUsuarioInt")
        })
        .catch(error => {
          console.error('Error al enviar datos a la API:', error);
          alert("El envío de datos a la API falló. Revise que los datos ingresados sean correctos");
        });
    }
  };

  const datosVacios = (inputs) => {
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        console.error("Hay campos vacios");
        alert("Por favor, llene todos los campos.");
        return false;
      }
    }
    return true;
  };

  const validarDatos = (inputs) => {
    var regex = /[,*()]/g;

    for (var i = 0; i < inputs.length; i++) {
      var inputValue = inputs[i].value.trim();

      if (regex.test(inputValue)) {
        console.error("El texto no puede contener los siguientes caracteres: '[', ']', '*', '(', ')'");
        alert("El texto no puede contener los siguientes caracteres: '[', ']', '*', '(', ')'");
        return false;
      }
    }

    console.log("Todos los textos son válidos.");
    return true;
  };

  const validarContraseña = (contraseña) => {
    var expresionRegular = /^[a-zA-Z0-9]{8,20}$/;

    if (expresionRegular.test(contraseña)) {
      console.log('La contraseña es válida.');
      return true;
    } else {
      console.error('La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.');
      alert('La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.');
      return false;
    }
  };

  useEffect(() => {
    const mostrarContra = mostrarContraRef.current;
    const ingresarButton = ingresarRef.current;

    // Añadir event listeners
    mostrarContra.addEventListener("click", mostrarContraseña);
    ingresarButton.addEventListener("click", enviarDatos);

    // Quitar event listeners al desmontar
    return () => {
      mostrarContra.removeEventListener("click", mostrarContraseña);
      ingresarButton.removeEventListener("click", enviarDatos);
    };
  }, []);

  return (
    <div className={styles.login}>
      {/* Fondo de la página */}
      <div id={styles.fondo_2}></div>
      <div id={styles.fondo_1}></div>

      {/* Contenedor principal */}
      <div className={styles.pantalla}>
        <h1>INICIAR SESIÓN</h1>  {/* Título principal */}

        {/* Formulario de inicio de sesión */}
        <form id={styles.formulario} ref={formularioRef}> {/* Usar ref en el formulario */}
          <input type="email"  id={styles.email}  ref={emailRef}  placeholder="INGRESA TU EMAIL" /> {/* Campo para ingresar el email */}
          <input type="password"  id={styles.contraseña}  ref={passwordInputRef}  placeholder="INGRESA TU CONTRASEÑA" /> {/* Campo para ingresar la contraseña */}
          <button className={styles.button} type="button" id={styles.mostrarContra} ref={mostrarContraRef}>Mostrar</button> {/* Botón para mostrar la contraseña */}
          <Link to="/RecuperarContra" id={styles.olvido}>¿Olvidaste tu contraseña?</Link> {/* Enlace para la página de recuperación de contraseña */}
          <Link to="/register" id={styles.register}>¿No tenés cuenta? Registrate</Link> {/* Enlace para la página de registro */}
          <button className={styles.button} type="button" id={styles.ingresar} ref={ingresarRef}>Entrar</button> {/* Botón para iniciar sesión */}
          <button className={styles.button} type="button" id={styles.google}>
            <img src="/logo_google.jpg" alt='logo de google' />
            INGRESAR CON GOOGLE
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;