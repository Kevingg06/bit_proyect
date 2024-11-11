import React, { useState, useEffect } from 'react';



const titulo = {
    display: 'inline',
    justifyContent: 'space-between',
    fontSize: '30px'
};

const estiloTexto = {
    fontSize: '20px',
    whiteSpace: 'pre-line',
    width: '85%',
    display: 'block',
    wordWrap: 'break-word'
};



export const DescripcionExt = () => {
    const [texto, setTexto] = useState('Todavía no se ha añadido una descripción');

    useEffect(() => {
        async function obtenerTextoDeAPI() {
            try {
                const respuesta = await fetch('https://api.ejemplo.com/usuario');
                const datos = await respuesta.json();
                setTexto(datos.descripcion); // Suponiendo que la respuesta de la API tiene una propiedad "nombre"
            } catch (error) {
                console.error('Error al obtener los títulos del usuario:', error);
            }
        }

        obtenerTextoDeAPI();
    }, []);

    return (
        <div style={{width: '100%'}}>
            <h4 style={titulo}>Sobre mí</h4>
            <p style={estiloTexto}>{texto}</p>
        </div>
    );
};
