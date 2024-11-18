import React, { useState } from 'react';
import styles from './LandingPage.module.css'; // Importa el archivo .module.css
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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

            <Link to="/register" className={`${styles.button} ${isDarkMode ? styles.active : ''}`}>
              Crear cuenta
            </Link>


            <span className={isDarkMode ? styles.active : ''}>or</span>
            <Link to="/login" className={`${styles.button} ${isDarkMode ? styles.active : ''}`}>
              Iniciar sesion
            </Link>
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