import React, { useState, useEffect } from 'react';

export const Noticia = () => {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');

  useEffect(() => {
    // Aquí se llama a la API para obtener los datos
    fetch('https://api.ejemplo.com/noticias/1') // Sustituye esta URL por la tuya
      .then(response => response.json())
      .then(data => {
        setTitulo(data.titulo);
        setTexto(data.texto);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente

  

  const tarjeta = {
    width: '88.857%',
    margin: 'auto',
    marginTop: '5%',
    marginBottom: '2%',
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    backgroundColor: '#c9c9c9',
  };

  const estiloTexto = {
    fontSize: '20px',
  };

  const estiloTitulo = {
    marginBottom: '3%',
    fontSize: '30px',
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={tarjeta}>
        <h4 style={estiloTitulo}>{titulo}</h4>
        <p style={estiloTexto}>{texto}</p>
      </div>
    </div>
  );
}