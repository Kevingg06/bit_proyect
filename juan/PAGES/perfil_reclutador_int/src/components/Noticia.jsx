import React from 'react'

export const Noticia = () => {

  const tarjeta = {
    width: '88.857%',
    margin: 'auto',
    marginTop: '7%',
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    backgroundColor: '#c9c9c9'
  };

  const estiloTexto = {
    fontSize: '20px'
  };

  const estiloTitulo = {
    marginBottom: '3%', // Corregido marginBotton a marginBottom
    fontSize: '30px'
  };

  const titulo = 'COTO';

  const texto = 'Queríamos avisar que el glory hole de Lanús ya no está disponible. Por favor, dejen de preguntar por él a nuestros empleados';

  return (
    <div style={{ width: '100%' }}> {/* Corregido widht a width */}
      <div style={tarjeta}>
        <h4 style={estiloTitulo}>{titulo}</h4>
        <p style={estiloTexto}>{texto}</p>
      </div>
    </div>
  );
}