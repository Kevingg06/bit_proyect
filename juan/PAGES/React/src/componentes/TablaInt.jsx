import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';




const guardar = {
  fontSize: '20px',
  whiteSpace: 'pre-line',
  width: '20%',
  height: '4%',
  marginTop: '1.5%',
  display: 'block',
  wordWrap: 'break-word'
};


const StyledTableContainer = styled(TableContainer)`
  border: 2px solid #4B0713;
  border-radius: 20px;
  overflow: hidden;
  background-color: #f7f0e5;
`;

const StyledTableCell = styled(TableCell)`
  border-right: 2px solid #4B0713;
  border-bottom: 1px solid #4B0713;
  min-width: 85.5px;
  max-width: 85.5px;
  background-color: ${props => props.isButton ? (props.isOccupied ? '#f15353' : '#7bc565') : '#f5e9c8'};
  color: ${props => props.isButton ? '#000' : '#4B0713'};
  cursor: ${props => props.isButton ? 'pointer' : 'default'};
  text-align: center;
  transform-style: preserve-3d;
  transition: background-color 0.5s, transform 0.5s;
  &:last-child {
    border-right: none;
  }
`;

const StyledHeaderCell = styled(TableCell)`
  background-color: #f5e9c8;
  font-weight: bold;
  max-width: 1px;
  color: #4B0713;
  border-right: 2px solid #4B0713;
  border-bottom: 1px solid #4B0713;
  &:last-child {
    border-right: none;
  }
`;

const TablaHorarios = () => {
  const [rotations, setRotations] = useState(Array(12 * 7).fill(0));
  const [statuses, setStatuses] = useState(
    Array(12 * 7)
      .fill("DISPONIBLE")
      .map((status, i) => (i % 2 === 0 ? "OCUPADO" : "DISPONIBLE"))
  );

  const handleButtonClick = (index) => {
    setRotations((prevRotations) =>
      prevRotations.map((rotation, i) =>
        i === index ? rotation + 360 : rotation
      )
    );
    setStatuses((prevStatuses) =>
      prevStatuses.map((status, i) =>
        i === index ? (status === "OCUPADO" ? "DISPONIBLE" : "OCUPADO") : status
      )
    );
  };

  const timeSlots = [
    "00:00 - 02:00", "02:00 - 04:00", "04:00 - 06:00", "06:00 - 08:00",
    "08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00",
    "16:00 - 18:00", "18:00 - 20:00", "20:00 - 22:00", "22:00 - 00:00"
  ];



  const guardarHorarios = async () => {
    // Organizar horarios por día (7 listas de 12 elementos cada una)
    const horariosSemana = [];
    for (let i = 0; i < 7; i++) {
      let diaHorarios = [];
      for (let j = 0; j < 12; j++) {
        diaHorarios.push(statuses[i * 12 + j]);
      }
      horariosSemana.push(diaHorarios);
    }

    // Enviar los datos al servidor (backend)
    try {
      const response = await fetch('/api/guardar-horarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ horarios: horariosSemana }),
      });

      if (response.ok) {
        console.log('Horarios guardados correctamente');
      } else {
        console.error('Error al guardar los horarios');
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };



  return (
    <>
      <StyledTableContainer component={Paper} variant="outlined">
        <Table aria-label="tabla de horarios">
          <TableHead>
            <TableRow>
              <StyledHeaderCell>Rango Horarios</StyledHeaderCell>
              <StyledHeaderCell>Lunes</StyledHeaderCell>
              <StyledHeaderCell>Martes</StyledHeaderCell>
              <StyledHeaderCell>Miércoles</StyledHeaderCell>
              <StyledHeaderCell>Jueves</StyledHeaderCell>
              <StyledHeaderCell>Viernes</StyledHeaderCell>
              <StyledHeaderCell>Sábado</StyledHeaderCell>
              <StyledHeaderCell>Domingo</StyledHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((time, rowIndex) => (
              <TableRow key={rowIndex}>
                <StyledTableCell isButton={false}>{time}</StyledTableCell>
                {[...Array(7)].map((_, colIndex) => {
                  const index = rowIndex * 7 + colIndex;
                  return (
                    <StyledTableCell
                      key={colIndex}
                      isButton={true}
                      isOccupied={statuses[index] === "OCUPADO"}
                      onClick={() => handleButtonClick(index)}
                      style={{ transform: `rotateX(${rotations[index]}deg)` }}
                    >
                      {statuses[index]}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <button style={guardar} onClick={guardarHorarios}>Guardar Horarios</button> {/* Botón para enviar datos */}
    </>
  );
};

export default TablaHorarios;