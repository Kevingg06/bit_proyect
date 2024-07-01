import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styled from '@emotion/styled';

const StyledTableContainer = styled(TableContainer)`
  border: 2px solid black;
  border-radius: 20px;
  overflow: hidden; /* Esto asegura que el contenido de la tabla respete los bordes redondeados */
`;

const StyledTableCell = styled(TableCell)`
  border-right: 2px solid black;
  width: 50%;
`;

const StyledHeaderCell = styled(TableCell)`
  background-color: #D9D9D9;
  font-weight: bold;
  border-right: 2px solid black;
  &:last-child {
    border-right: none;
  }
`;

const StyledTableRow = styled(TableRow)`
  height: 30px; /* Ajusta este valor para cambiar la altura de las filas */
`;

const TablaHorarios = () => (
  <StyledTableContainer component={Paper} variant="outlined">
    <Table aria-label="demo table">
      <TableHead>
        <StyledTableRow>
          <StyledHeaderCell>Rango Horarios</StyledHeaderCell>
          <StyledHeaderCell>Disponibilidad</StyledHeaderCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        <StyledTableRow>
          <StyledTableCell>00:00 - 02:00</StyledTableCell>
          <TableCell>OCUPADO</TableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>02:00 - 04:00</StyledTableCell>
          <TableCell>OCUPADO</TableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>04:00 - 06:00</StyledTableCell>
          <TableCell>OCUPADO</TableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>06:00 - 08:00</StyledTableCell>
          <TableCell>OCUPADO</TableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>08:00 - 10:00</StyledTableCell>
          <TableCell>DISPONIBLE</TableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>10:00 - 12:00</StyledTableCell>
          <TableCell>DISPONIBLE</TableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>12:00 - 14:00</StyledTableCell>
          <TableCell>DISPONIBLE</TableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>14:00 - 16:00</StyledTableCell>
          <TableCell>DISPONIBLE</TableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>16:00 - 18:00</StyledTableCell>
          <TableCell>DISPONIBLE</TableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>18:00 - 20:00</StyledTableCell>
          <TableCell>DISPONIBLE</TableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>20:00 - 22:00</StyledTableCell>
          <TableCell>OCUPADO</TableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>22:00 - 00:00</StyledTableCell>
          <TableCell>OCUPADO</TableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  </StyledTableContainer>
);

export default TablaHorarios;
