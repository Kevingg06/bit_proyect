import React from 'react'

export const Noticia = () => {

    const tarjeta = {
        width: '88.857%',
        margin: 'auto',
        marginTop: '7%',
        height: '200px',
        backgroundColor: 'red'
    };

    const titulo = 'COTO';

  return (
    <div style={{widht: '10%'}}>
        <div style={tarjeta}>
            <h4>{titulo}</h4>
            <p>Queríamos avisar que el glory hole de Lanus ya no esta disponible. Por favor dejen de preguntar por él a nuestros empleados</p>
        </div>
    </div>
  )
}
