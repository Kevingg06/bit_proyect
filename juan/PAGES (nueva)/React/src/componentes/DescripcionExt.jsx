import React, { useState, useEffect } from 'react';

const textoStyle = {
    color: 'black',
    marginTop: '2%',
    fontSize: '30px',
    height: '50%',
    color: '#4B0713'
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
        <div>
            <h4>Descripcion</h4>
            <p style={textoStyle}>{texto}</p>
        </div>
    );
};
