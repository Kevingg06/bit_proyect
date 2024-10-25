import React, { useState, useEffect } from 'react';


const titulo = {
    display: 'inline',
    justifyContent: 'space-between',
    fontSize: '30px'
};

const estiloTexto = {
    fontSize: '25px',
    whiteSpace: 'pre-line',
    width: '100%',
    display: 'block',
    wordWrap: 'break-word'
};



export const TitulosExt = () => {
    const [texto, setTexto] = useState('Todavía no se han añadido títulos');

    useEffect(() => {
        async function obtenerTextoDeAPI() {
            try {
                const respuesta = await fetch('https://api.ejemplo.com/usuario');
                const datos = await respuesta.json();
                setTexto(datos.titulos); // Suponiendo que la respuesta de la API tiene una propiedad "nombre"
            } catch (error) {
                console.error('Error al obtener los títulos del usuario:', error);
            }
        }

        obtenerTextoDeAPI();
    }, []);

    return (
        <div>
            <h4 style={titulo}>Tìtulos</h4>
            <p style={estiloTexto}>{texto}</p>
        </div>
    );
};
