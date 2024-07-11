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
  background-color: #f7f0e5;
`;

const StyledTableCell = styled(TableCell)`
  border-right: 2px solid #4B0713;
  border-bottom: 1px solid #4B0713;
  width: 10%;
  color: ${props => props.isButton ? '#00000' : '#4B0713'}; /* Color de texto blanco para botones, negro para horarios */
  background-color: ${props => props.isHeader ? '#dabc89' : '#f7f0e5'}; /* Fondo igual al encabezado para horarios */
  cursor: ${props => props.isButton ? 'pointer' : 'default'}; /* Cursor de puntero solo para botones */
  text-align: center;
  transform-style: preserve-3d;
  transition: transform 0.5s;
`;

const StyledHeaderCell = styled(TableCell)`
  width: 10%;
  background-color: #dabc89;
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
            <TableRow key={rowIndex}>
              <StyledTableCell isButton={false} isHeader={true}>{time}</StyledTableCell>
              {[...Array(7)].map((_, colIndex) => {
                const index = rowIndex * 7 + colIndex;
                return (
                  <StyledTableCell
                    key={colIndex}
                    isButton={true}
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
