import React, { useState } from 'react';
import './RegisterPage.css'; // Import your CSS file

const RegisterPage = () => {
  const [accountType, setAccountType] = useState(null);

  const handleAccountType = (type) => {
    setAccountType(type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted!');
  };

  return (
    <div>
      {accountType === null && (
        <div className="pantalla" id="root_eleccion">
          <h2>¿PARA QUÉ UTILIZARÁ SU CUENTA?</h2>
          <button id="btn_empleado" className="btn_eleccion" onClick={() => handleAccountType('empleado')}>
            EMPLEADO
          </button>
          <button id="btn_empresa" className="btn_eleccion" onClick={() => handleAccountType('empresa')}>
            EMPRESA
          </button>
        </div>
      )}

      {accountType === 'empleado' && (
        <div className="pantalla" id="root_empleado">
          <h1>Empieza a expandir tus posibilidades</h1>
          <p>Primero necesitamos recopilar algunos datos</p>
          <form className="formulario" id="form_empleado" onSubmit={handleSubmit}>
            <input id="nombre_empleado" type="text" placeholder="NOMBRE Y APELLIDO" autoComplete="name" />
            <input id="email_empleado" type="email" placeholder="EMAIL" required />
            <input id="edad_empleado" type="number" placeholder="EDAD" />
            <input id="contraseña1_empleado" type="password" placeholder="CONTRASEÑA (mínimo 8 caracteres)" />
            <input id="contraseña2_empleado" type="password" placeholder="CONFIRMAR CONTRASEÑA" />
            <p id="aclaracion">
              Al hacer clic en «ACEPTAR Y CONTINUAR», aceptas las Condiciones de uso, la Política de privacidad y la
              Política de cookies de Hire-Me.
            </p>
            <button type="submit" id="datos_empleado">
              ACEPTAR Y CONTINUAR
            </button>
          </form>
          <a href="../INICIO_SESION/login.html">¿Ya tenés una cuenta? Iniciá sesión</a>
          <button className="google">
            <img src="./img/logo_google.jpg" alt="Google Logo" />
            <span>INGRESAR CON GOOGLE</span>
          </button>
          <button className="volver" onClick={() => setAccountType(null)}>
            VOLVER
          </button>
        </div>
      )}

      {accountType === 'empresa' && (
        <div className="pantalla" id="root_empresa">
          <h1>Empieza a expandir tus posibilidades</h1>
          <p>Primero necesitamos recopilar algunos datos</p>
          <form className="formulario" id="form_empresa" onSubmit={handleSubmit}>
            <input id="nombre_empresa" type="text" placeholder="NOMBRE" />
            <input id="email_empresa" type="email" placeholder="EMAIL" />
            <input id="direccion_empresa" type="text" placeholder="DIRECCIÓN" />
            <input id="contraseña1_empresa" type="password" placeholder="CONTRASEÑA (mínimo 8 caracteres)" />
            <input id="contraseña2_empresa" type="password" placeholder="CONFIRMAR CONTRASEÑA" />
            <p id="aclaracion">
              Al hacer clic en «ACEPTAR Y CONTINUAR», aceptas las Condiciones de uso, la Política de privacidad y la
              Política de cookies de Hire-Me.
            </p>
            <button type="submit" id="datos_empresa">
              ACEPTAR Y CONTINUAR
            </button>
          </form>
          <a href="../INICIO_SESION/login.html">¿Ya tenés una cuenta? Iniciá sesión</a>
          <button className="google">
            <img src="./img/logo_google.jpg" alt="Google Logo" />
            <span>INGRESAR CON GOOGLE</span>
          </button>
          <button className="volver" onClick={() => setAccountType(null)}>
            VOLVER
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;