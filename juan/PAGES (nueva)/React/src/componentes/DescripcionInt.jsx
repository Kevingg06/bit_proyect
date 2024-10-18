import React, { useState } from 'react';
import { TextField, Modal, Typography, Fab, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const DescripcionInt = () => {
    const [texto, setTexto] = useState("Todavía no se ha añadido una descripción");
    const [open, setOpen] = useState(false);



    // Función para enviar texto a la base de datos
    const enviarTextoABD = async (texto) => {
        try {
            const response = await fetch('https://api.tuservidor.com/descripcion', {  // URL de tu API
                method: 'POST',  // O 'PUT' si estás actualizando un registro existente
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ texto }),  // Enviar el texto en formato JSON
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos a la base de datos');
            }

            const data = await response.json();  // Procesa la respuesta si es necesario
            console.log('Descripción guardada en la base de datos:', data);
        } catch (error) {
            console.error('Error al guardar la descripción:', error);
        }
    };

    

    const cambiarTexto = (nuevoTexto) => {
        setTexto(nuevoTexto);
    };

    const handleOpen = () => setOpen(true);

    // Llamar a la función de envío cuando se cierra el modal
    const handleClose = () => {
        enviarTextoABD(texto);  // Enviar el texto a la base de datos
        setOpen(false);  // Cerrar el modal
    };

    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4
    };

    const titulo = {
        display: 'inline',
        justifyContent: 'space-between'
    };

    const cajaTitulo = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    return (
        <div>
            <div style={cajaTitulo}>
                <h4 style={titulo}>Sobre mí</h4>
                <Fab color="secondary" aria-label="edit" size="small" onClick={handleOpen}>
                    <EditIcon />
                </Fab>
            </div>

            <p style={{ whiteSpace: 'pre-line', width: '85%', display: 'block', wordWrap: 'break-word' }}>
                {texto}
            </p>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cuéntale al mundo quién eres.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="Descríbase brevemente"
                                    multiline
                                    maxRows={10}
                                    variant="standard"
                                    value={texto}  // Valor controlado por el estado `texto`
                                    onChange={e => cambiarTexto(e.target.value)}
                                />
                            </div>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}