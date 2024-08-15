import React, { useState } from 'react';
import { TextField, Button, Modal, Typography, Fab, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


export const Descripcion = () => {
    const [texto, setTexto] = useState("Todavía no se ha añadido una descripción");
    const [open, setOpen] = useState(false); // Falta añadir el estado 'open' para controlar el Modal

    const cambiarTexto = (nuevoTexto) => {
        setTexto(nuevoTexto);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
        alignItems: 'center'  // Alinea los elementos en el eje vertical
    };

    return (
        <div>
            <div style={cajaTitulo}>
                <h4 style={titulo}>Sobre mí</h4>

                <Button onClick={handleOpen}>
                    <Fab color="secondary" aria-label="edit" size="small">
                        <EditIcon />
                    </Fab>
                </Button>
            </div>


            <p style={{ whiteSpace: 'pre-line' }}>{texto}</p>

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
                                    maxRows={1}
                                    variant="standard"
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