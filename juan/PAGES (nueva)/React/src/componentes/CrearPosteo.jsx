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

export default function CrearPosteo() {
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null); // Estado para la imagen cargada

    // Función para enviar datos a la base de datos
    const enviarPostABD = async (titulo, texto, image) => {
        const formData = new FormData(); // Usar FormData para enviar la imagen
        formData.append('titulo', titulo);
        formData.append('texto', texto);
        if (image) {
            formData.append('image', image); // Agregar la imagen al FormData
        }

        try {
            const response = await fetch('https://api.tuservidor.com/descripcion', {
                method: 'POST',
                body: formData, // Enviar el FormData
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos a la base de datos');
            }

            const data = await response.json();
            console.log('Posteo guardado en la base de datos:', data);
        } catch (error) {
            console.error('Error al guardar el posteo:', error);
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
        enviarPostABD(titulo, texto, image); // Enviar tanto el título como la descripción y la imagen a la base de datos
        setOpen(false); // Cerrar el modal
    };

    // Manejar el cambio de imagen
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Guardar el archivo de imagen
        }
    };

    return (
        <div>
            <Button variant='contained' color="secondary" onClick={handleOpen}>Crear posteo</Button>
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
                        placeholder="Escriba el título del posteo"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                        value={titulo} // Valor controlado por el estado `titulo`
                        onChange={e => cambiarTitulo(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="modal-modal-description"
                        label="Descripción"
                        placeholder="Escriba la descripción del posteo"
                        variant="outlined"
                        multiline
                        rows={4} // Ajustar el número de filas si es necesario
                        value={texto} // Valor controlado por el estado `texto`
                        onChange={e => cambiarDescripcion(e.target.value)}
                    />
                    <input
                        accept="image/*"
                        id="image-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="image-upload">
                        <Button variant="contained" component="span" sx={{ marginTop: 2 }}>
                            Subir Imagen
                        </Button>
                    </label>
                    {image && <img src={URL.createObjectURL(image)} alt="Vista previa" style={{ width: '100px', height: 'auto', marginTop: '16px' }} />}
                </Box>
            </Modal>
        </div>
    );
}