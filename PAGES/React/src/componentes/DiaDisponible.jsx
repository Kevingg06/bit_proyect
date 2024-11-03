import React, { useState } from 'react';

const DiaDisponible = ({ text }) => {
  // Estado para manejar el color del botón
  const [isRed, setIsRed] = useState(true);
  const [rotation, setRotation] = useState(0);

  // Estilos en línea para el botón
  const buttonStyle = {
    backgroundColor: isRed ? 'red' : 'green',
    width: '100%',
    height: '7%',
    marginTop: '12%',
    color: 'white',
    fontSize: '20px',
    padding: '10px 20px',
    border: 'black solid 1px',
    borderRadius: '20px',
    cursor: 'pointer',
    boxShadow: '2px 1px 4px 3px rgba(0, 0, 0, 0.2)',
    transformStyle: 'preserve-3d',
    transition: 'background-color 0.5s, transform 0.5s',
    transform: `rotateX(${rotation}deg)`
  };

  // Función para manejar el clic en el botón
  const handleClick = () => {
    setIsRed(!isRed); // Cambia el estado al valor opuesto
    setRotation(rotation + 360); // Aumenta la rotación en 360 grados
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>
      {text}
    </button>
  );
};

export default DiaDisponible;