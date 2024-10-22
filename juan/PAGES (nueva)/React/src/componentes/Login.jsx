import React, { useEffect, useRef } from 'react';
import estilos from './Login.module.css';

function Login() {

  const passwordInputRef = useRef(null);
  const mostrarContraRef = useRef(null);
  const emailRef = useRef(null);
  const ingresarRef = useRef(null);

  useEffect(() => {
    const passwordInput = passwordInputRef.current;
    const mostrarContra = mostrarContraRef.current;
    const ingresarButton = ingresarRef.current;

    const mostrarContraseña = () => {
      if (passwordInput.type == "password") {
        passwordInput.type = "text";
        mostrarContra.textContent = "Ocultar";
      } else {
        passwordInput.type = "password";
        mostrarContra.textContent = "Mostrar";
      }
    };

    const enviarDatos = () => {
      const emailUsuario = emailRef.current.value;
      const contraseñaUsuario = passwordInput.value;

      var datos = {
        email: emailUsuario,
        contraseña: contraseñaUsuario
      };

      var inputs = document.getElementById("formulario").getElementsByTagName("input");

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

            window.location.href = 'http://localhost:3000/';
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

    mostrarContra.addEventListener("click", (event) => {
      event.preventDefault();
      mostrarContraseña();
    });

    ingresarButton.addEventListener("click", enviarDatos);

    return () => {
      mostrarContra.removeEventListener("click", (event) => {
        event.preventDefault();
        mostrarContraseña();
      });

      ingresarButton.removeEventListener("click", enviarDatos);
    };
  }, []);



  return (
    <div className="login">
      {/* Fondo de la página */}
      <div id="fondo_2"></div>
      <div id="fondo_1"></div>

      {/* Contenedor principal */}
      <div className="pantalla">
        <h1>INICIAR SESIÓN</h1>  {/* Título principal */}

        {/* Formulario de inicio de sesión */}
        <form id="formulario">
          <input type="email" id="email" ref={emailRef} placeholder="INGRESA TU EMAIL" /> {/* Campo para ingresar el email */}
          <input type="password" id="contraseña" ref={passwordInputRef} placeholder="INGRESA TU CONTRASEÑA" /> {/* Campo para ingresar la contraseña */}
          <button type="button" id="mostrarContra" ref={mostrarContraRef}>Mostrar</button> {/* Botón para mostrar la contraseña */}
          <a id="olvido" href="#">¿Olvidaste tu contraseña?</a> {/* Enlace para la página de recuperación de contraseña */}
          <a id="register" href="#">¿No tenés cuenta? Registrate</a> {/* Enlace para la página de registro */}
          <button type="button" id="ingresar" ref={ingresarRef}>Entrar</button> {/* Botón para iniciar sesión */}
          <button type="button" id="google">
            <img src="/logo_google.jpg" alt='makako' />
            INGRESAR CON GOOGLE
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;