import React, { useState } from 'react';
import { TextField, Button, Modal, Box } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CrearAnuncio() {
    const [titulo, setTitulo] = useState("Escriba el título del anuncio");
    const [texto, setTexto] = useState("Escriba la descripción del anuncio");
    const [open, setOpen] = useState(false);

    // Función para enviar texto a la base de datos
    const enviarAnuncioABD = async (titulo, texto) => {
        try {
            const response = await fetch('https://api.tuservidor.com/descripcion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titulo, texto }),  // Ahora se envía tanto el título como el texto
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos a la base de datos');
            }

            const data = await response.json();
            console.log('Anuncio guardado en la base de datos:', data);
        } catch (error) {
            console.error('Error al guardar el anuncio:', error);
        }
    };

    const cambiarDescripcion = (nuevoTexto) => {
        setTexto(nuevoTexto);
    };

    const cambiarTitulo = (nuevoTitulo) => {
        setTitulo(nuevoTitulo);
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        enviarAnuncioABD(titulo, texto);  // Enviar tanto el título como la descripción a la base de datos
        setOpen(false);  // Cerrar el modal
    };

    return (
        <div>
            <Button variant='contained' color="secondary" onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        fullWidth
                        id="modal-modal-title"
                        label="Título"
                        placeholder="Escriba el título del anuncio"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                        value={titulo}  // Valor controlado por el estado `titulo`
                        onChange={e => cambiarTitulo(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="modal-modal-description"
                        label="Descripción"
                        placeholder="Escriba la descripción del anuncio"
                        variant="outlined"
                        multiline
                        rows={4}  // Ajustar el número de filas si es necesario
                        value={texto}  // Valor controlado por el estado `texto`
                        onChange={e => cambiarDescripcion(e.target.value)}
                    />
                </Box>
            </Modal>
        </div>
    );
}