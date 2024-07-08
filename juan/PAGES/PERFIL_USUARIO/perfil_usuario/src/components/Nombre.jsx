import React, { useState, useEffect } from 'react';

const nombreStyle = {
    color: 'black',
    marginLeft: '3%',
    fontSize: '45px',
    height: '50%'
};

export const Nombre = () => {
    const [nombre, setNombre] = useState('Nombre Apellido');

    useEffect(() => {
        async function obtenerNombreDeAPI() {
            try {
                const respuesta = await fetch('https://api.ejemplo.com/usuario');
                const datos = await respuesta.json();
                setNombre(datos.nombre); // Suponiendo que la respuesta de la API tiene una propiedad "nombre"
            } catch (error) {
                console.error('Error al obtener el nombre del usuario:', error);
            }
        }

        obtenerNombreDeAPI();
    }, []);

    return (
        <p style={nombreStyle}>{nombre}</p>
    );
};
