import { Box, Typography } from "@material-ui/core";
import React, { ChangeEvent, FC, useState } from "react";

import DatabaseJSONProps from "../../types/DatabaseProps";
import { Column } from "../../types/PagedTableProps";
import ExecutantFilter from "../ExecutantFilter";
import PagedTable from "../PagedTable";

interface idTypes {
  id: "patientId" | "hospitalizedTime" | "requester" | "executant";
}

interface RowProps {
  patientId: string;
  hospitalizedTime: string;
  requester: string;
  executant: string;
}

const columns: (Column & idTypes)[] = [
  {
    id: "patientId",
    label: "Identificação\u00a0do\u00a0Paciente",
  },
  { id: "hospitalizedTime", label: "Tempo Internado", minWidth: 170 },
  { id: "requester", label: "Solicitante", minWidth: 170 },
  { id: "executant", label: "Executante", minWidth: 170 },
];

function createData(
  patientId: string,
  hospitalizedTime: string,
  requester: string,
  executant: string
): RowProps {
  return {
    patientId,
    hospitalizedTime,
    requester,
    executant,
  };
}

const HospitalizedTimeTab: FC = () => {
  const [executantFilter, setExecutantFilter] = useState("");
  const [rows, setRows] = useState<RowProps[]>([]);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setExecutantFilter(e.target.value);
  }

  function handleOnSubmit(filteredDb: DatabaseJSONProps[]) {
    const sortedObj = filteredDb
      .map((item) => {
        const requestDate = new Date(item.dataSoli);
        const dischargedDate = new Date(item.dataAlta);
        const diffTime = dischargedDate.getTime() - requestDate.getTime();

        const days = (diffTime / 86400000).toFixed(0);
        const restDays = diffTime % 86400000;
        const hours = (restDays / 3600000).toFixed(0);

        const hospitalizedTime = `Dias: ${days}; Horas: ${hours}`;

        return {
          rowsObj: createData(
            item.paciente.id,
            hospitalizedTime,
            item.solicitante,
            item.executante
          ),
          sorting: diffTime,
        };
      })
      .sort((a, b) => a.sorting - b.sorting);

    const rowsObj = sortedObj.flatMap((item) => item.rowsObj);

    setRows(rowsObj);
  }

  return (
    <Box>
      <Typography variant="h4">
        <Box textAlign="center" mb={4}>
          Pesquise um hospital executante e veja o tempo que cada paciente ficou
          internado.
        </Box>
      </Typography>
      <ExecutantFilter
        executantFilter={executantFilter}
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
      />
      <PagedTable rows={rows} columns={columns} />
    </Box>
  );
};

export default HospitalizedTimeTab;
