import { Box, Button, TablePagination, TextField } from "@material-ui/core";
import React, { ChangeEvent, FC, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import DatabaseJSONProps from "../../types/DatabaseProps";
import ExecutantFilter from "../ExecutantFilter";

interface Column {
  id:
    | "executant"
    | "patientId"
    | "patientAge"
    | "patientCity"
    | "requester"
    | "authDate"
    | "hospitalizedDate"
    | "dischargedDate";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    id: "patientId",
    label: "Identificação\u00a0do\u00a0Paciente",
  },
  {
    id: "patientAge",
    label: "Idade\u00a0do\u00a0Paciente",
  },
  {
    id: "patientCity",
    label: "Cidade\u00a0do\u00a0Paciente",
  },
  {
    id: "requester",
    label: "Solicitante",
    minWidth: 170,
  },
  {
    id: "authDate",
    label: "Data\u00a0de\u00a0Autorização",
  },
  {
    id: "hospitalizedDate",
    label: "Data\u00a0de\u00a0Internação",
  },
  {
    id: "dischargedDate",
    label: "Data\u00a0de\u00a0Alta",
  },
  { id: "executant", label: "Executante", minWidth: 170 },
];

interface RowProps {
  patientId: string;
  patientAge: string;
  patientCity: string;
  requester: string;
  authDate: string;
  hospitalizedDate: string;
  dischargedDate: string;
  executant: string;
}

function createData(
  patientId: string,
  patientAge: string,
  patientCity: string,
  requester: string,
  authDate: string,
  hospitalizedDate: string,
  dischargedDate: string,
  executant: string
): RowProps {
  return {
    patientId,
    patientAge,
    patientCity,
    requester,
    authDate,
    hospitalizedDate,
    dischargedDate,
    executant,
  };
}
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const PatientsTab: FC = () => {
  const [executantFilter, setExecutantFilter] = useState("");
  const [rows, setRows] = useState<RowProps[]>([]);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setExecutantFilter(e.target.value);
  }

  function handleOnSubmit(filteredDb: DatabaseJSONProps[]) {
    console.log(filteredDb);
    const rowsObj = filteredDb.map((item) =>
      createData(
        item.paciente.id,
        item.paciente.idade,
        item.paciente.munResidencia,
        item.solicitante,
        new Date(item.dataAut).toLocaleDateString(),
        new Date(item.dataIntern).toLocaleDateString(),
        new Date(item.dataAlta).toLocaleDateString(),
        item.executante
      )
    );
    setRows(rowsObj);
  }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <ExecutantFilter
        executantFilter={executantFilter}
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
      />

      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, id) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default PatientsTab;
