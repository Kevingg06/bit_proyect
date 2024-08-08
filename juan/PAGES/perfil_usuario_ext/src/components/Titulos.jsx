import React, { useState, useEffect } from 'react';

const textoStyle = {
    color: 'black',
    marginLeft: '3%',
    fontSize: '30px',
    height: '50%',
    color: '#4B0713'
};

export const Titulos = () => {
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
            <h4>Tìtulos</h4>
            <p style={textoStyle}>{texto}</p>
        </div>
    );
};
