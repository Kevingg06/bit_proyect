import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';

const StyledTableContainer = styled(TableContainer)`
  border: 2px solid #4B0713;
  border-radius: 20px;
  overflow: hidden;
  background-color: #f5e9c8;
`;

const StyledTableCell = styled(TableCell)`
  border-right: 2px solid #4B0713;
  border-bottom: 1px solid #4B0713;
  width: 10%;
  background-color: ${props => props.isOccupied === "true" ? '#f15353' : '#7bc565'}; 
  color: ${props =>  '#000' }; 
  cursor: ${props => 'pointer'}; 
  text-align: center;
  transform-style: preserve-3d;
  transition: background-color 0.5s, transform 0.5s;
`;

const StyledHeaderCell = styled(TableCell)`
  width: 10%;
  background-color: #f5e9c8;
  font-weight: bold;
  color: #4B0713;
  border-right: 2px solid #4B0713;
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

  return (
    <StyledTableContainer component={Paper} variant="outlined">
      <Table aria-label="demo table">
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
            <TableRow key={rowIndex}>{/* 🎯 Eliminar espacio en blanco */}
              <StyledTableCell>{time}</StyledTableCell> 
              {/* 🎯 Eliminar espacios en blanco */}
              {[...Array(7)].map((_, colIndex) => {
                const index = rowIndex * 7 + colIndex;
                return (
                  <StyledTableCell
                    key={colIndex}
                    isOccupied={statuses[index] === "OCUPADO" ? "true" : "false"} 
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
  );
};

export default TablaHorarios;