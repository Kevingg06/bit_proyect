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

export default function CrearPosteo({ agregarPosteo }) {
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        const nuevoPosteo = {
            id: Date.now(), // ID único
            titulo,
            texto,
            image: image ? URL.createObjectURL(image) : null,
        };
        agregarPosteo(nuevoPosteo); // Agregar el nuevo posteo
        setOpen(false);
        setTitulo("");
        setTexto("");
        setImage(null);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) setImage(file);
    };

    return (
        <div>
            <Button variant='contained' color="secondary" onClick={handleOpen}>Crear posteo</Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <TextField
                        fullWidth
                        id="modal-modal-title"
                        label="Título"
                        placeholder="Escriba el título del posteo"
                        variant="outlined"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        id="modal-modal-description"
                        label="Descripción"
                        placeholder="Escriba la descripción del posteo"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                    />
                    <input
                        accept="image/*"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        id="image-upload"
                    />
                    <label htmlFor="image-upload">
                        <Button variant="contained" component="span" sx={{ marginTop: 2 }}>
                            Subir Imagen
                        </Button>
                    </label>
                    {image && <img src={URL.createObjectURL(image)} alt="Vista previa" style={{ width: '100px', height: 'auto', marginTop: '16px' }} />}
                    <Button variant="contained" color="primary" onClick={handleClose} sx={{ marginTop: 2 }}>
                    Guardar
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}