import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

export const Descripcion = () => {
    const [texto, setTexto] = useState("Todavía no se ha añadido una descripción");

    const cambiarTexto = (nuevoTexto) => {
        setTexto(nuevoTexto);
    }

    return (
        <div>
            <p style={{ whiteSpace: 'pre-line' }}>{texto}</p>

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
                        id="outlined-multiline-flexible"
                        label="Descríbase brevemente"
                        multiline
                        maxRows={1}
                        onChange={e => cambiarTexto(e.target.value)}
                    />
                </div>
            </Box>
        </div>
    );
}