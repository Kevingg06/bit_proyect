import React from 'react';
import { Box, Typography } from '@mui/material';
import { Noticia } from './Noticia';

const Noticiero = () => {

    const estiloNoticiero = {
        display: 'flex',
        backgroundColor: '#eeeded',
        marginLeft: '10%',
        width: '90%',
        maxHeight: '700px', // Cambiado a maxHeight para limitar la altura
        borderRadius: '25px',
        boxShadow: '4px 4px 10px 6px rgba(0, 0, 0, 0.2)',
        flexDirection: 'column',
        color: '#4B0713',
        position: 'sticky', // Mantiene el elemento en su lugar al hacer scroll
        top: '8.4%', // Ajusta la posición sticky para tener en cuenta el margen superior
        zIndex: 1, // Asegura que el componente Noticiero esté por encima de otros contenidos
    };

    const miniTitulo = {
        backgroundColor: '#adadad',
        borderTopRightRadius: '25px',
        borderTopLeftRadius: '25px',
        minHeight: '60px', // Cambiado a minHeight
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
        boxSizing: 'border-box',
        top: 0, // Fija el miniTitulo en la parte superior del contenedor
        zIndex: 1, // Asegura que el miniTitulo esté por encima de otros contenidos
    };

    return (
        <Box sx={{ width: '30.172%', marginTop: '3%' }}>
            <Box sx={estiloNoticiero}>
                <Box sx={miniTitulo}>
                    <h4 style={{fontSize:'25px'}}>Puede ser de tu interés</h4>
                </Box>
                <Box sx={{ flexGrow: 1 }} style={{overflowY: 'auto'}}>
                    <Noticia />
                    <Noticia />
                    <Noticia />
                    <Noticia />
                    <Noticia />
                    <Noticia />
                    <Noticia />
                    <Noticia />
                    <Noticia />
                    <Noticia />
                </Box>
            </Box>
        </Box>
    );
};

export default Noticiero;
