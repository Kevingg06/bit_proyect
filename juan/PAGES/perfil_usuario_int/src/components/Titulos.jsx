import React, { useState } from 'react';
import { TextField, Modal, Typography, Fab, Box } from '@mui/material'; // 🎯 Eliminar Button
import EditIcon from '@mui/icons-material/Edit';

export const Titulos = () => {
    const [texto, setTexto] = useState("Todavía no se han añadido títulos");
    const [open, setOpen] = useState(false);

    const cambiarTexto = (nuevoTexto) => {
        setTexto(nuevoTexto);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const titulo = {
        display: 'inline',
        justifiContent: 'spaceBetween'
    };

    const cajaTitulo = {
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center' 
    };

    return (
        <div>
            <div style={cajaTitulo}>
                <h4 style={titulo}>Títulos</h4>
                {/* 🎯 Corrección: onClick en el Fab */}
                <Fab color="secondary" aria-label="edit" size="small" onClick={handleOpen}> 
                    <EditIcon />
                </Fab> 
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
                        Añade tus logros académicos y/o laborales.
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
                                    label="Agregue sus títulos"
                                    multiline
                                    maxRows={5}
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