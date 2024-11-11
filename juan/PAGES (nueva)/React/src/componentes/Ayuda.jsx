import React, { useState } from 'react';
import styles from './Ayuda.module.css';

const Ayuda = () => {
    // Estado para manejar las pestañas activas
    const [activeTab, setActiveTab] = useState(0);
    // Estado para manejar las preguntas activas (expandidas)
    const [activeQuestion, setActiveQuestion] = useState(null);

    // Maneja el cambio de pestaña
    const handleTabClick = (index) => {
        setActiveTab(index); // Establece la pestaña activa según el índice
    };

    // Maneja la expansión y contracción de las preguntas
    const handleQuestionClick = (index) => {
        // Si la pregunta ya está activa, la cerramos (null)
        if (activeQuestion === index) {
            setActiveQuestion(null);
        } else {
            setActiveQuestion(index); // Si no está activa, la abrimos
        }
    };

    return (
        <div id={styles.ayuda}>
            <div id={styles.root}>
                <h1 className={styles.titulo}>CENTRO DE AYUDA AL USUARIO</h1>
                <div className={styles.container}>
                    <div className={styles.tab_box}>
                        <button
                            className={`${styles.tab_btn} ${activeTab === 0 ? styles.active : ''}`}
                            onClick={() => handleTabClick(0)}
                        >
                            Preguntas frecuentes
                        </button>
                        <button
                            className={`${styles.tab_btn} ${activeTab === 1 ? styles.active : ''}`}
                            onClick={() => handleTabClick(1)}
                            id={styles.reporte}
                        >
                            Reportar un problema
                        </button>
                    </div>

                    <div className={styles.content_box}>
                        {/* Pestaña 1: Preguntas Frecuentes */}
                        <div className={`${styles.content} ${activeTab === 0 ? styles.active : ''}`}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Escriba su pregunta"
                            />
                            <h3 className={styles.mini_titulos}>Recientes</h3>
                            <button
                                className={styles.flecha_menu}
                                onClick={() => handleQuestionClick(0)}
                            >
                                ¿Cómo bloqueo a un usuario?
                            </button>
                            <p
                                className={`${styles.respuesta} ${activeQuestion === 0 ? styles.active : ''}`}
                            >
                                Para bloquear a usuario tienes que ingresar a su perfil, presionar
                                los 3 puntos en la parte superior de su tarjeta y tocar la opción “bloquear usuario”
                            </p>
                            <button
                                className={styles.flecha_menu}
                                onClick={() => handleQuestionClick(1)}
                            >
                                ¿Cómo envío un mensaje a un usuario empleado?
                            </button>
                            <p
                                className={`${styles.respuesta} ${activeQuestion === 1 ? styles.active : ''}`}
                            >
                                Para contactar con un usuario empleado mediante mensaje debes ingresar a su perfil
                                y hacer click en el símbolo de sobre arriba a la derecha. Eso te redirigirá a un chat con esa persona
                            </p>

                            <h3 className={styles.mini_titulos}>Más frecuentes</h3>
                            <button
                                className={styles.flecha_menu}
                                onClick={() => handleQuestionClick(2)}
                            >
                                ¿Cómo se si la gente me quiere o solo soy un juego para ellos?
                            </button>
                            <p
                                className={`${styles.respuesta} ${activeQuestion === 2 ? styles.active : ''}`}
                            >
                                Para bloquear a Martín Galeano tienes que ingresar a su perfil, presionar
                                los 3 puntos en la parte superior de su tarjeta y tocar la opción “bloquear usuario”
                            </p>
                            <button
                                className={styles.flecha_menu}
                                onClick={() => handleQuestionClick(3)}
                            >
                                ¿El día que termine esto voy a ser realmente feliz?
                            </button>
                            <p
                                className={`${styles.respuesta} ${activeQuestion === 3 ? styles.active : ''}`}
                            >
                                Para bloquear a Martín Galeano tienes que ingresar a su perfil, presionar
                                los 3 puntos en la parte superior de su tarjeta y tocar la opción “bloquear usuario”
                            </p>
                            <button
                                className={styles.flecha_menu}
                                onClick={() => handleQuestionClick(4)}
                            >
                                ¿cómo hago para hacer una publicación sobre un trabajo?
                            </button>
                            <p
                                className={`${styles.respuesta} ${activeQuestion === 4 ? styles.active : ''}`}
                            >
                                Para bloquear a Martín Galeano tienes que ingresar a su perfil, presionar
                                los 3 puntos en la parte superior de su tarjeta y tocar la opción “bloquear usuario”
                            </p>
                            <button
                                className={styles.flecha_menu}
                                onClick={() => handleQuestionClick(5)}
                            >
                                ¿qué hago si no puedo agarrar la pala?
                            </button>
                            <p
                                className={`${styles.respuesta} ${activeQuestion === 5 ? styles.active : ''}`}
                            >
                                Para bloquear a Martín Galeano tienes que ingresar a su perfil, presionar
                                los 3 puntos en la parte superior de su tarjeta y tocar la opción “bloquear usuario”
                            </p>
                        </div>

                        {/* Pestaña 2: Reportar un Problema */}
                        <div className={`${styles.content} ${activeTab === 1 ? styles.active : ''}`}>
                            <h2 className={styles.segundoTitulo}>CONTÁCTANOS</h2>
                            <h3 className={styles.mini_titulos}>Sugerencias:</h3>
                            <p className={styles.texto}>
                                Envíanos un correo electrónico a la dirección debajo. Cuéntanos qué podríamos hacer para
                                mejorar. Dinos qué te gustaría que te permitiera hacer la página, en qué cosas deberíamos
                                enfocarnos y/o qué features te interesaría que implementáramos. Estamos constantemente revisando nuestra
                                casilla en busca de feedback que podamos implementar. Ninguna sugerencia es mala y analizaremos todas en busca de aplicarlas.
                            </p>
                            <h3 className={styles.mini_titulos}>Problemas:</h3>
                            <p className={styles.texto}>
                                Envíanos un correo electrónico a la dirección debajo. Cuéntanos de cualquier problema que
                                hayas tenido utilizando la página. Buscaremos resolverlos lo antes posible. Agradecemos enormemente su paciencia y
                                el esfuerzo de hacernos saber de todo tipo de inconvenientes que haya tenido.
                            </p>
                            <h3 className={styles.mini_titulos}>Dudas:</h3>
                            <p className={styles.texto}>
                                En caso de no haber encontrado su duda en la sección de "Preguntas frecuentes" envíenos un
                                correo electrónico a la dirección debajo. Intentaremos resolver sus dudas con nuestros
                                mayores esfuerzos para que pueda navegar cómodamente por nuestro sitio web. Gracias por su paciencia.
                            </p>
                            <div className={styles.linea}></div>
                            <div id={styles.imgContactos}>
                                <img src="/mail.png" alt="Icono de Email" className={styles.contacto} />
                                <img src="/mail.png" alt="Icono de Email" className={styles.contacto} />
                                <img src="/mail.png" alt="Icono de Email" className={styles.contacto} />
                            </div>
                            <div id={styles.txtContactos}>
                                <h4>EMAIL</h4>
                                <h4>EMAIL</h4>
                                <h4>EMAIL</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ayuda;
