import React from 'react'

export const Posteo = () => {

    const tarjeta = {
        width: '88.857%',
        margin: '3% auto',
        display: 'flex',
        flexDirection: 'column',
        height: '700px',
        backgroundColor: '#eeeded',
        alignItems: 'center',
        borderRadius: '20px',
        boxShadow: '4px 4px 10px 6px rgba(0, 0, 0, 0.2)'
    }

    const estiloTitulo = {
        marginBottom: '1%', // Corregido marginBotton a marginBottom
        marginTop: '2%',
        fontSize: '30px',
    };

    const estiloTexto = {
        fontSize: '20px',
        marginBottom: '3%',
        padding: '1%'
    };

    const imagen = {
        width: '80%',
        height: '70%',
        marginBottom: '1%',
        backgroundImage: 'url(/acelerador.jpg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '20px'
    };

    const titulo = 'Se busca ingeniero nuclear';

    const texto = 'Es requerido un experto en la materia para trabajar en el mantenimiento del aceleradro de particulas ubicado en el CERN';

    return (
        <div style={tarjeta}>
            <h4 style={estiloTitulo}>{titulo}</h4>
            <p style={estiloTexto}>{texto}</p>
            <div style={imagen}></div>
        </div>
    )
}