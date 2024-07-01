import React, { useState } from 'react';
import { TextField } from '@mui/material';

export const Titulos = () => {
    const [texto, setTexto] = useState("Todavía no has añadido títulos");

    const cambiarTexto = (nuevoTexto) => {
        setTexto(nuevoTexto);
    }

    return (
        <div>
            <p>{texto}</p>
            <TextField id="standard-basic" label="Incluir títulos" variant="standard" onChange={e => cambiarTexto(e.target.value)}/>
        </div>
    );
}