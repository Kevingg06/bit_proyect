import React, { useState, useEffect } from 'react';

const nombreStyle = {
  color: 'black',
  marginLeft: '3%',
  fontSize: '35px',
  height: '50%'
};

export const Nombre = ({ getCookie }) => { // Recibir getCookie como prop
  const [nombre, setNombre] = useState('Cargando...');

  useEffect(() => {
    // Obtener el nombre de la cookie
    const cookieData = getCookie('authToken');
    if (cookieData && cookieData.nombre) {
      setNombre(cookieData.nombre);
    } else {
      setNombre('Error al cargar el nombre');
    }
  }, [getCookie]); // Agregar getCookie como dependencia

  return (
    <p style={nombreStyle}>{nombre}</p>
  );
};