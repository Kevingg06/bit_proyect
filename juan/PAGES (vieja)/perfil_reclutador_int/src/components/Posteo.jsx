import React, { useEffect, useState } from 'react';

export const Posteo = () => {
  const [posteos, setPosteos] = useState([]); // Estado para almacenar los posteos

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

  // Función para obtener los posteos desde la base de datos
  const fetchPosteos = async () => {
    try {
      const response = await fetch('https://api.tuservidor.com/descripcion'); // Cambia la URL según tu API
      if (!response.ok) {
        throw new Error('Error al obtener los posteos');
      }
      const data = await response.json();
      setPosteos(data); // Almacena los datos obtenidos en el estado
    } catch (error) {
      console.error('Error al cargar los posteos:', error);
    }
  };

  // Llama a la función fetchPosteos cuando el componente se monta
  useEffect(() => {
    fetchPosteos();
  }, []);

  return (
    <div>
      {posteos.map((posteo) => (
        <div key={posteo.id} style={tarjeta}> {/* Asegúrate de tener un ID único en cada posteo */}
          <h4 style={estiloTitulo}>{posteo.titulo}</h4>
          <p style={estiloDescripcion}>{posteo.texto}</p>
          <img src={posteo.image} alt={posteo.titulo} style={estiloImagen} />
        </div>
      ))}
    </div>
  );
};