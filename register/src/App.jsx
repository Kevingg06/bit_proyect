import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    console.log('DOMContentLoaded event fired');

    const elecciones = document.querySelectorAll('.btn_eleccion');
    const roots = document.querySelectorAll('.pantalla');
    const opcion = document.querySelector('#root_eleccion');
    const vueltas = document.querySelectorAll('.volver');
    const btnEmpleado = document.querySelector('#btn_empleado');
    const btnEmpresa = document.querySelector('#btn_empresa');

    function desactivarTodos() {
      elecciones.forEach((eleccion) => eleccion.classList.remove('active'));
      roots.forEach((content) => content.classList.remove('active'));
      opcion.classList.remove('active');
      btnEmpleado.classList.remove('active');
      btnEmpresa.classList.remove('active');
    }

    opcion.classList.add('active');

    elecciones.forEach((eleccion, index) => {
      eleccion.addEventListener('click', () => {
        desactivarTodos();
        eleccion.classList.add('active');
        if (index < roots.length) {
          roots[index].classList.add('active');
        }
        opcion.classList.remove('active');
      });
    });

    vueltas.forEach((volver) => {
      volver.addEventListener('click', () => {
        desactivarTodos();
        opcion.classList.add('active');
      });
    });

    document.getElementById('datos_empresa').addEventListener("click", enviarDatos_empresa);
    document.getElementById('datos_empleado').addEventListener("click", enviarDatos_empleado);
  }, []);

  function enviarDatos_empresa() {
    const nombre_empresa = document.getElementById('nombre_empresa').value;
    const email_empresa = document.getElementById('email_empresa').value;
    const cuit_empresa = document.getElementById('cuit_empresa').value;
    const contraseña1_empresa = document.getElementById('contraseña1_empresa').value;
    const contraseña2_empresa = document.getElementById('contraseña2_empresa').value;

    const datosEmpresa = {
      nombre: nombre_empresa,
      email: email_empresa,
      cuit: cuit_empresa,
      contraseña1: contraseña1_empresa,
      contraseña2: contraseña2_empresa,
    };

    var formulario = document.getElementById("form_empresa");
    var inputs = formulario.getElementsByTagName("input");

    if (datosVacios(inputs) && validarDatos(inputs) && validarContraseña(contraseña1_empresa) && segundaContraseña(contraseña1_empresa, contraseña2_empresa)) {
      console.log('Todos los datos son correctos. Enviando datos...');

      fetch('http://localhost:5500/register', { // URL corregida
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(datosEmpresa),
      })
        .then((response) => {
          console.log('Respuesta recibida:', response.status);
          if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Respuesta de la API:', data);
          // Actualizar la cookie del lado del cliente
          document.cookie = `authToken=${JSON.stringify({
            token: data.token, 
            userId: data.userId,
            nombre: data.nombre 
          })}`;
        })
        .catch((error) => {
          console.error('Error al enviar datos a la API:', error);
        });
    } else {
      console.log('Validación de datos fallida');
    }
  }

  function enviarDatos_empleado() {
    const nombre_empleado = document.getElementById('nombre_empleado').value;
    const email_empleado = document.getElementById('email_empleado').value;
    const edad_empleado = document.getElementById('edad_empleado').value;
    const contraseña1_empleado = document.getElementById('contraseña1_empleado').value;
    const contraseña2_empleado = document.getElementById('contraseña2_empleado').value;

    const datosEmpleado = {
      nombre: nombre_empleado,
      email: email_empleado,
      edad: edad_empleado,
      contraseña1: contraseña1_empleado,
      contraseña2: contraseña2_empleado,
    };

    var formulario = document.getElementById("form_empleado");
    var inputs = formulario.getElementsByTagName("input");

    if (datosVacios(inputs) && validarDatos(inputs) && validarContraseña(contraseña1_empleado) && segundaContraseña(contraseña1_empleado, contraseña2_empleado)) {
      console.log('Todos los datos son correctos. Enviando datos...');

      fetch('http://localhost:5500/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer <token>',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(datosEmpleado),
      })
        .then((response) => {
          console.log('Respuesta recibida:', response.status);
          if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Respuesta de la API:', data);
          window.location.href = 'http://localhost:3000/';
        })
        .catch((error) => {
          console.error('Error al enviar datos a la API:', error);
          alert("El envío de datos a la API falló.");
        });
    }
  }

  function datosVacios(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        console.error("Hay campos vacíos");
        alert("Por favor, llene todos los campos.");
        return false;
      }
    }
    console.log('no hay datos vacíos');
    return true;
  }

  function validarContraseña(contraseña) {
    var expresionRegular = /^[a-zA-Z0-9]{8,20}$/;

    if (expresionRegular.test(contraseña)) {
      console.log('La contraseña es válida.');
      return true;
    } else {
      alert('La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.');
      console.log('la contraseña no es válida');
      return false;
    }
  }

  function segundaContraseña(contraseña, contraseña2) {
    if (contraseña === contraseña2) {
      console.log('Las dos contraseñas son iguales');
      return true;
    } else {
      console.error("Las contraseñas deben ser iguales");
      alert("Las contraseñas deben ser iguales");
      return false;
    }
  }

  function validarDatos(inputs) {
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
  }

  return (
    <div id='above'>
      <div id="fondo_2"></div>
      <div id="fondo_1"></div>

      <div className="pantalla" id="root_empleado">
        <h1>Empieza a expandir tus posibilidades</h1>
        <p>Primero necesitamos recopilar algunos datos</p>
        <form className="formulario" id="form_empleado" action="/register" method="post">
          <input id="nombre_empleado" type="text" placeholder="NOMBRE Y APELLIDO" autoComplete="name" />
          <input id="email_empleado" type="email" placeholder="EMAIL" required />
          <input id="edad_empleado" type="number" placeholder="EDAD" />
          <input id="contraseña1_empleado" type="password" placeholder="CONTRASEÑA (mínimo 8 caracteres)" />
          <input id="contraseña2_empleado" type="password" placeholder="CONFIRMAR CONTRASEÑA" />
          <p id="aclaracion">
            Al hacer clic en «ACEPTAR Y CONTINUAR», aceptas las Condiciones de uso, la Política de privacidad y la Política de cookies de Hire-Me.
          </p>
          <button type="button" id="datos_empleado">ACEPTAR Y CONTINUAR</button>
        </form>
        <a href="../INICIO_SESION/login.html">¿Ya tenés una cuenta? Iniciá sesión</a>
        <button className="google">
          <img src="/logo_google.jpg" alt="Google logo" />
          <span>INGRESAR CON GOOGLE</span>
        </button>
        <button className="volver">VOLVER</button>
      </div>

      <div className="pantalla" id="root_empresa">
        <h1>Empieza a expandir tus posibilidades</h1>
        <p>Primero necesitamos recopilar algunos datos</p>
        <form className="formulario" id="form_empresa" action="/register" method="post">
          <input id="nombre_empresa" type="text" placeholder="NOMBRE" />
          <input id="email_empresa" type="email" placeholder="EMAIL" />
          <input id="cuit_empresa" type="text" placeholder="CUIT" />
          <input id="contraseña1_empresa" type="password" placeholder="CONTRASEÑA (mínimo 8 caracteres)" />
          <input id="contraseña2_empresa" type="password" placeholder="CONFIRMAR CONTRASEÑA" />
          <p id="aclaracion">
            Al hacer clic en «ACEPTAR Y CONTINUAR», aceptas las Condiciones de uso, la Política de privacidad y la Política de cookies de Hire-Me.
          </p>
          <button type="button" id="datos_empresa">ACEPTAR Y CONTINUAR</button>
        </form>
        <a href="../INICIO_SESION/login.html">¿Ya tenés una cuenta? Iniciá sesión</a>
        <button className="google">
          <img src="/logo_google.jpg" alt="Google logo" />
          <span>INGRESAR CON GOOGLE</span>
        </button>
        <button className="volver">VOLVER</button>
      </div>

      <div className="pantalla" id="root_eleccion">
        <h2>¿PARA QUÉ UTILIZARÁ SU CUENTA?</h2>
        <button id="btn_empleado" className="btn_eleccion">EMPLEADO</button>
        <button id="btn_empresa" className="btn_eleccion">EMPRESA</button>
      </div>
    </div>
  );
}

export default App;