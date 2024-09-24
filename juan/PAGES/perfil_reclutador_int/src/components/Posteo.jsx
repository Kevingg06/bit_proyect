import React from 'react';

export const Posteo = () => {
  const tarjeta = {
    width: '88.857%',
    height: 'auto', // Se ajusta al contenido
    margin: '3% auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eeeded',
    alignItems: 'center',
    borderRadius: '20px',
    boxShadow: '4px 4px 10px 6px rgba(0, 0, 0, 0.2)',
    padding: '2%', // Añadir algo de padding para asegurar que no se pegue a los bordes
  };

  const estiloTitulo = {
    marginBottom: '2%',
    marginTop: '2%',
    fontSize: '30px',
  };

  const estiloTexto = {
    fontSize: '20px',
    marginBottom: '2%',
    paddingLeft: '4%',
    paddingRight: '4%',
    textAlign: 'center',
  };

  const estiloImagen = {
    width: '95%',
    height: 'auto', // Se ajusta al tamaño original de la imagen
    borderRadius: '20px',
    marginTop: '3%',
    marginBottom: '3%',
  };

  const titulo = 'Se busca ingeniero nuclear';
  const texto =
    'Es requerido un experto en la materia para trabajar en el mantenimiento del acelerador de partículas ubicado en el CERN';

  return (
    <div style={tarjeta}>
      <h4 style={estiloTitulo}>{titulo}</h4>
      <p style={estiloTexto}>{texto}</p>
      {/* Elimina el div contenedor de la imagen */}
      <img src="/acelerador.jpg" alt="Acelerador" style={estiloImagen} />
    </div>
  );
};