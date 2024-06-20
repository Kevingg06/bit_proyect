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

const TablaHorarios = () => (
  <StyledTableContainer component={Paper} variant="outlined">
    <Table aria-label="demo table">
      <TableHead>
        <TableRow>
          <StyledHeaderCell>Dessert</StyledHeaderCell>
          <StyledHeaderCell>Calories</StyledHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <StyledTableCell>Frozen yoghurt</StyledTableCell>
          <StyledTableCell>109</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>Cupcake</StyledTableCell>
          <StyledTableCell>305</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>Ice cream sandwich</StyledTableCell>
          <StyledTableCell>237</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>Donut</StyledTableCell>
          <StyledTableCell>452</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>Eclair</StyledTableCell>
          <StyledTableCell>262</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>Eclair</StyledTableCell>
          <StyledTableCell>262</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>Eclair</StyledTableCell>
          <StyledTableCell>262</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>Eclair</StyledTableCell>
          <StyledTableCell>262</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>Eclair</StyledTableCell>
          <StyledTableCell>262</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>Eclair</StyledTableCell>
          <StyledTableCell>262</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>Eclair</StyledTableCell>
          <StyledTableCell>262</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>Eclair</StyledTableCell>
          <StyledTableCell>262</StyledTableCell>
        </TableRow>
      </TableBody>
    </Table>
  </StyledTableContainer>
);

export default TablaHorarios;

