import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useContext, useEffect, useState } from "react";
import DbContext from "../../context/DbContext";

interface Column {
  id:
    | "position"
    | "patientId"
    | "patientAge"
    | "patientCity"
    | "waitingTime"
    | "executant";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  {
    id: "position",
    label: "Posição",
  },
  { id: "waitingTime", label: "Tempo na Fila" },
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
  { id: "executant", label: "Executante", minWidth: 170 },
];

interface RowProps {
  position: number;
  patientId: string;
  patientAge: string;
  patientCity: string;
  waitingTime: string;
  executant: string;
}

function createData(
  position: number,
  patientId: string,
  patientAge: string,
  patientCity: string,
  waitingTime: string,
  executant: string
): RowProps {
  return {
    position,
    patientId,
    patientAge,
    patientCity,
    waitingTime,
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

const LongerTimeTab: FC = () => {
  const [rows, setRows] = useState<RowProps[]>([]);
  const { dbJson } = useContext(DbContext);

  useEffect(() => {
    const rowsObj = dbJson
      .sort((a, b) => {
        if (a.horasFila > b.horasFila) {
          return -1;
        } else if (a.horasFila < b.horasFila) {
          return 1;
        }
        return 0;
      })
      .slice(0, 5)
      .map((item, id) =>
        createData(
          id + 1,
          item.paciente.id,
          item.paciente.idade,
          item.paciente.munResidencia,
          item.horasFila,
          item.executante
        )
      );

    setRows(rowsObj);
  }, [dbJson]);

  const classes = useStyles();
  return (
    <Box>
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
              {rows.map((row, id) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default LongerTimeTab;
