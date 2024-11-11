import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import styles from './RecuperarContra.module.css';

const RecuperarContra = () => {

    const navigate = useNavigate(); // Llamar al hook dentro del componente


    // Estado para llevar el seguimiento del paso actual
    const [pasoActual, setPasoActual] = useState(0);

    // Manejar el avance al siguiente paso
    const avanzar = () => {
        if (pasoActual < 2) {
            setPasoActual(pasoActual + 1);
        }
    };

    // Manejar el retroceso al paso anterior
    const retroceder = () => {
        if (pasoActual > 0) {
            setPasoActual(pasoActual - 1);
        } else {
            // Redirigir al login si estamos en el primer paso
            navigate("/login");
        }
    };

    return (
        <div>
            <div id={styles.fondo_2}></div>
            <div id={styles.fondo_1}></div>

            {/* Paso 1 */}
            <div className={`${styles.root} ${pasoActual === 0 ? styles.active : ''}`}>
                <h1 className={styles.titulo}>Recuperar contraseña</h1>
                <div className={styles.circulo}>
                    <p className={styles.texto}>1/3</p>
                </div>
                <form className={styles.formulario}>
                    <input
                        className={styles.input}
                        id={styles.mail}
                        type="email"
                        placeholder="EMAIL"
                    />
                    <p className={styles.texto}>Asegúrate de escribir la dirección de mail vinculada con tu cuenta. Te enviaremos un correo a la casilla con un código de seguridad.</p>
                    <button className={styles.siguiente} type="button" onClick={avanzar}>SIGUIENTE</button>
                </form>
                <button className={styles.volver} type="button" onClick={retroceder}>VOLVER</button>
            </div>

            {/* Paso 2 */}
            <div className={`${styles.root} ${pasoActual === 1 ? styles.active : ''}`}>
                <h1 className={styles.titulo}>Recuperar contraseña</h1>
                <div className={styles.circulo}>
                    <p className={styles.texto}>2/3</p>
                </div>
                <form className={styles.formulario}>
                    <input
                        className={styles.input}
                        id={styles.codigo}
                        type="number"
                        placeholder="Ingresar Código"
                    />
                    <p className={styles.texto}>Por favor, ingresá el código enviado a tu correo electrónico para confirmar tu identidad.</p>
                    <a href="#">¿No te llegó el código? Volver a enviar</a>
                    <button className={styles.siguiente} type="button" onClick={avanzar}>SIGUIENTE</button>
                </form>
                <button className={styles.volver} type="button" onClick={retroceder}>VOLVER</button>
            </div>

            {/* Paso 3 */}
            <div className={`${styles.root} ${pasoActual === 2 ? styles.active : ''}`} id={styles.ultima}>
                <h1 className={styles.titulo}>Nueva contraseña</h1>
                <div className={styles.circulo}>
                    <p className={styles.texto}>3/3</p>
                </div>
                <form className={styles.formulario}>
                    <input
                        className={styles.input}
                        id={styles.contraseña}
                        type="password"
                        placeholder="Nueva contraseña"
                    />
                    <input
                        className={styles.input}
                        id={styles.nuevaContraseña}
                        type="password"
                        placeholder="Confirmar nueva contraseña"
                    />
                    <button className={styles.siguiente} type="button">SIGUIENTE</button>
                </form>
                <button className={styles.volver} type="button" onClick={retroceder}>VOLVER</button>
            </div>
        </div>
    );
};

export default RecuperarContra;
