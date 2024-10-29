import React, { useState } from 'react';
import { TextField, Modal, Typography, Fab, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const DescripcionInt = () => {
    const [texto, setTexto] = useState("Todavía no se ha añadido una descripción");
    const [open, setOpen] = useState(false);

    // Función auxiliar para obtener el ID del usuario de la cookie
    function getCookie(cookieName) {
      const name = cookieName + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(';');
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
          return JSON.parse(cookie.substring(name.length, cookie.length));
        }
      }
      return "";
    }

    const userId = getCookie('authToken').userId; 

    // Función para enviar texto a la base de datos
    const enviarTextoABD = async (texto) => {
        try {
            const response = await fetch('http://localhost:5500/api/user/description', { 
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Asegura que la cookie se envíe con la solicitud
                body: JSON.stringify({ userId, texto })
                
        });

            if (!response.ok) {
                throw new Error('Error al enviar los datos a la base de datos');
            }

            const data = await response.json(); 
            console.log('Descripción guardada en la base de datos:', data);
            setTexto(data.description); 
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
        enviarTextoABD(texto);  
        setOpen(false);  
    };
    

    const estiloModal = {
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
        justifyContent: 'space-between',
        fontSize: '30px'
    };

    const cajaTitulo = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const estiloTexto = {
        fontSize: '25px',
        whiteSpace: 'pre-line',
        width: '85%',
        display: 'block',
        wordWrap: 'break-word'
    };

    

    return (
        <div style={{width: '100%'}}>   {/* Si por alguna razón el ancho del componente se rompe es culpa de esto */}
            <div style={cajaTitulo}>
                <h4 style={titulo}>Sobre mí</h4>
                <Fab color="secondary" aria-label="edit" size="small" onClick={handleOpen}>
                    <EditIcon />
                </Fab>
            </div>

            <p style={estiloTexto}>
                {texto}
            </p>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={estiloModal}>
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