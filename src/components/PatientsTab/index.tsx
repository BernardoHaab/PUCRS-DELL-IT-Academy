import { Box, Typography } from "@material-ui/core";
import React, { ChangeEvent, FC, useState } from "react";

import DatabaseJSONProps from "../../types/DatabaseProps";
import ExecutantFilter from "../ExecutantFilter";
import { Column } from "../../types/PagedTableProps";
import PagedTable from "../PagedTable";
interface idTypes {
  id:
    | "executant"
    | "patientId"
    | "patientAge"
    | "patientCity"
    | "requester"
    | "authDate"
    | "hospitalizedDate"
    | "dischargedDate";
}

interface RowProps {
  patientId: string;
  patientAge: string;
  patientCity: string;
  requester: string;
  authDate: Date;
  hospitalizedDate: Date;
  dischargedDate: Date;
  executant: string;
}

const columns: (Column & idTypes)[] = [
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
    formatDate: (date: Date) => date.toLocaleDateString(),
  },
  {
    id: "hospitalizedDate",
    label: "Data\u00a0de\u00a0Internação",
    formatDate: (date: Date) => date.toLocaleDateString(),
  },
  {
    id: "dischargedDate",
    label: "Data\u00a0de\u00a0Alta",
    formatDate: (date: Date) => date.toLocaleDateString(),
  },
  { id: "executant", label: "Executante", minWidth: 170 },
];

function createData(
  patientId: string,
  patientAge: string,
  patientCity: string,
  requester: string,
  authDate: Date,
  hospitalizedDate: Date,
  dischargedDate: Date,
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
        new Date(item.dataAut),
        new Date(item.dataIntern),
        new Date(item.dataAlta),
        item.executante
      )
    );
    setRows(rowsObj);
  }

  return (
    <Box>
      <Typography variant="h4">
        <Box textAlign="center" mb={4}>
          Veja as informações do paciente de acordo com o executante informado.
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

export default PatientsTab;
