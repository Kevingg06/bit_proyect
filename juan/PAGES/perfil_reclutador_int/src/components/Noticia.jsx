import React, { useState, useEffect } from 'react';

export const Noticia = () => {
  const [titulo, setTitulo] = useState('Oficinas cerradas temporalmente');
  const [texto, setTexto] = useState('Queríamos notificar que nuestras oficinas estarán cerradas por unos días debido a una fumigación programada');

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
    height: '200px',
    marginTop: '5%',
    marginBottom: '2%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '2%',
    paddingRight: '2%',    
    backgroundColor: '#c9c9c9',
  };

  const estiloTexto = {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: '17px',
  };

  const estiloTitulo = {
    marginTop: '2%',
    fontSize: '25px',
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