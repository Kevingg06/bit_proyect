import React, { useEffect, useState } from 'react';

export const Posteo = ({ posteos }) => {
  

  // Estilos para los elementos
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

  const estiloDescripcion = {
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

  return (
    <div>
      {posteos && posteos.length > 0 ? ( // Condición para verificar si posteos existe y tiene elementos
        posteos.map((posteo) => (
          <div key={posteo.id} style={tarjeta}>
            <h4 style={estiloTitulo}>{posteo.titulo}</h4>
            <p style={estiloDescripcion}>{posteo.texto}</p>
            {posteo.image && ( // Condición para verificar si la imagen existe
              <img src={posteo.image} alt={posteo.titulo} style={estiloImagen} />
            )}
          </div>
        ))
      ) : (
        <p>No hay posteos aún.</p> //Mensaje si no hay posteos
      )}
    </div>
  );
};