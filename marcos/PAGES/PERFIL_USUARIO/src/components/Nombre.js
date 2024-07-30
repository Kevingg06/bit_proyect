import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const nombreStyle = {
    color: 'black',
    marginLeft: '3%',
    fontSize: '45px',
    height: '50%'
};

const Nombre = () => { // Quita 'export' aquí
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5500/profile', {
                    credentials: 'include' 
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user); 
                } else {
                    console.error('Error al obtener datos del usuario:', response.status);
                    navigate('/login'); 
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                navigate('/login'); 
            }
        };

        fetchUserData(); 
    }, [navigate]); 

    return (
        <div style={nombreStyle}> {/* Aplica los estilos aquí */}
            {user ? (
                <div>
                    <p>Hola, {user.username}!</p> 
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Cargando información del usuario...</p> 
            )}
        </div>
    );
};

export default Nombre; // Exporta el componente al final