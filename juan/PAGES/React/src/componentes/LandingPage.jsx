import React, { useState } from 'react';
import styles from './LandingPage.module.css'; // Importa el archivo .module.css

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`${styles.app} ${isDarkMode ? styles.active : ''}`}>
      <header className={`${styles.header} ${isDarkMode ? styles.active : ''}`}>
        <button
          className={`${styles.switch} ${isDarkMode ? styles.active : ''}`}
          onClick={toggleTheme}
        >
          {isDarkMode ? 'Oscuro' : 'Claro'}
        </button>
      </header>

      <section className={`${styles.background} ${isDarkMode ? styles.active : ''}`}>
        <div className={styles.container}>
          <h1 className={`${styles.h1} ${isDarkMode ? styles.active : ''}`}>Bienvenido</h1>

          <div className={styles.buttons}>
            <a
              className={`${styles.button} ${isDarkMode ? styles.active : ''}`}
              href="../REGISTRARSE/registrarse.html"
            >
              Crear Cuenta
            </a>
            <span className={isDarkMode ? styles.active : ''}>or</span>
            <a
              className={`${styles.button} ${isDarkMode ? styles.active : ''}`}
              href="../INICIO_SESION/inicio_sesion.html"
            >
              Iniciar Sesión
            </a>
          </div>

          <p className={isDarkMode ? styles.active : ''}>
            Aviso: Crear una cuenta o iniciar sesión a una cuenta ya creada implica aceptar los{' '}
            <a href="#">terminos de usuario de Hire-Me</a>
          </p>
        </div>
      </section>

      <footer className={isDarkMode ? styles.active : ''}></footer>
    </div>
  );
};

export default LandingPage;
