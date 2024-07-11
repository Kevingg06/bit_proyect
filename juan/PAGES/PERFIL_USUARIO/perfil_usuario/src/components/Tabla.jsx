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
  width: 50%;
  color: #4B0713;
  background-color: #f7f0e5;
`;

const StyledButtonCell = styled(TableCell)`
  width: 50%;
  height: 100%;
  color: #4B0713;
  background-color: #f7f0e5;
  border-bottom: 1px solid #4B0713;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: background-color 0.5s, transform 0.5s;
`;

const StyledHeaderCell = styled(TableCell)`
  background-color: #dabc89;
  font-weight: bold;
  color: #4B0713;
  border-right: 2px solid #4B0713;
  &:last-child {
    border-right: none;
  }
`;

const StyledTableRow = styled(TableRow)`
  height: 20px;
`;

const TablaHorarios = () => {
  const initialRotations = Array(12).fill(0); // Suponiendo que hay 12 filas en el cuerpo de la tabla
  const initialStatus = [
    "OCUPADO", "OCUPADO", "OCUPADO", "OCUPADO",
    "DISPONIBLE", "DISPONIBLE", "DISPONIBLE", "DISPONIBLE",
    "DISPONIBLE", "DISPONIBLE", "OCUPADO", "OCUPADO"
  ]; // Estado inicial para las disponibilidades
  const [rotations, setRotations] = useState(initialRotations);
  const [statuses, setStatuses] = useState(initialStatus);

  const handleButtonClick = (index) => {
    setRotations((prevRotations) => 
      prevRotations.map((rotation, i) => (i === index ? rotation + 360 : rotation))
    );
    setStatuses((prevStatuses) =>
      prevStatuses.map((status, i) =>
        i === index ? (status === "OCUPADO" ? "DISPONIBLE" : "OCUPADO") : status
      )
    );
  };

  const data = [
    { time: "00:00 - 02:00", status: statuses[0] },
    { time: "02:00 - 04:00", status: statuses[1] },
    { time: "04:00 - 06:00", status: statuses[2] },
    { time: "06:00 - 08:00", status: statuses[3] },
    { time: "08:00 - 10:00", status: statuses[4] },
    { time: "10:00 - 12:00", status: statuses[5] },
    { time: "12:00 - 14:00", status: statuses[6] },
    { time: "14:00 - 16:00", status: statuses[7] },
    { time: "16:00 - 18:00", status: statuses[8] },
    { time: "18:00 - 20:00", status: statuses[9] },
    { time: "20:00 - 22:00", status: statuses[10] },
    { time: "22:00 - 00:00", status: statuses[11] }
  ];

  return (
    <StyledTableContainer component={Paper} variant="outlined">
      <Table aria-label="demo table">
        <TableHead>
          <StyledTableRow>
            <StyledHeaderCell>Rango Horarios</StyledHeaderCell>
            <StyledHeaderCell>Disponibilidad</StyledHeaderCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{row.time}</StyledTableCell>
              <StyledButtonCell
                onClick={() => handleButtonClick(index)}
                style={{ transform: `rotateX(${rotations[index]}deg)` }}
              >
                {row.status}
              </StyledButtonCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default TablaHorarios;
