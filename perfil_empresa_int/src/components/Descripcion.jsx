import React, { useState } from 'react';
import { TextField, Button, Modal, Typography, Fab, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


export const Descripcion = () => {
    const [texto, setTexto] = useState("Todavía no se ha añadido una descripción");
    const [open, setOpen] = useState(false); // Falta añadir el estado 'open' para controlar el Modal



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
        justifiContent: 'spaceBetween'
    };

    const cajaTitulo = {
        display: 'flex',  // Cambiado de 'block' a 'flex'
        justifyContent: 'space-between',
        alignItems: 'center',  // Alinea los elementos en el eje vertical
        alignText: 'left'
    };

    const globo = {
        width: '40%',
        marginLeft: '2%',
        height: '95%'
    }
    

    return (
        <div style={globo}>
            <div style={cajaTitulo}>
                <h3 style={titulo}>Sobre la empresa</h3>

                <Button onClick={handleOpen}>
                    <Fab color="secondary" aria-label="edit" size="small">
                        <EditIcon />
                    </Fab>
                </Button>
            </div>


            <p style={{ whiteSpace: 'pre-line', textAlign: 'left', width: '85%', display: 'block', wordWrap: 'break-word'  }}>{texto}</p>

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