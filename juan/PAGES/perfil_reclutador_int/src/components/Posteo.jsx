import React from 'react'

export const Posteo = () => {

    const tarjeta = {
        width: '88.857%',
        margin: '3% auto',
        display: 'flex',
        flexDirection: 'column',
        height: '700px',
        backgroundColor: '#eeeded'
    }

    const estiloTitulo = {
        marginBottom: '1%', // Corregido marginBotton a marginBottom
        fontSize: '30px',
    };

    const estiloTexto = {
        fontSize: '20px',
        margin: 'auto',
        marginBottom: '2%'
    };

    const imagen = {
        width: '80%',
        height: '70%',
        marginLeft: '5%',
        marginBottom: '1%',
        backgroundImage: 'url(/marquitos.jpg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    };

    const titulo = 'Se busca detective privado';

    const texto = 'Estamos buscando a un detective privado para que localice a este hombre (en la imagen) y se lo notifique a la policia. Es un reconocido programador POO que se ha robado un importante codigo de nuestra empreza. El pago por hayarlo asciende a USD $500.000';

    return (
        <div style={tarjeta}>
            <h4 style={estiloTitulo}>{titulo}</h4>
            <p style={estiloTexto}>{texto}</p>
            <div style={imagen}></div>
        </div>
    )
}