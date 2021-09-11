import React, { ChangeEvent, FC, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, EventTracker } from "@devexpress/dx-react-chart";
import { Box } from "@material-ui/core";

import CityFilter from "../CityFilter";

import DatabaseJSONProps from "../../types/DatabaseProps";
import SexTypes from "../../types/SexTypes";
import BarTableProps from "../../types/BarTableProps";

const AgeTab: FC = () => {
  const [municipioFiltro, setMunicipioFiltro] = useState("");
  const [avgAges, setAvgAges] = useState<BarTableProps[]>([]);
  const [graphTitle, setGraphTitle] = useState("Pesquise uma cidade");

  function handleSubmit(filteredDb: DatabaseJSONProps[]) {
    const avgAgesObj = getAvgAges(filteredDb);
    setGraphTitle(`Média de idade da cidade ${municipioFiltro}`);

    setAvgAges([
      {
        selector: `Sexo ${SexTypes.masc.toLowerCase()}`,
        info: avgAgesObj.mascAvgAge,
      },
      {
        selector: `Sexo ${SexTypes.fem.toLowerCase()}`,
        info: avgAgesObj.femAvgAge,
      },
      {
        selector: `Sexo ${SexTypes.unknown.toLowerCase()}`,
        info: avgAgesObj.unknownSexAvgAge,
      },
      {
        selector: "Media Total",
        info: avgAgesObj.allPatients,
      },
    ]);
  }

  function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setMunicipioFiltro(e.target.value);
  }

  function getAvgAges(db: DatabaseJSONProps[]) {
    const { mascInfos, femInfos, unknownSexInfos } = getInfosBySex(db);

    const mascAgeSum = getAgeSum(mascInfos);
    const femAgeSum = getAgeSum(femInfos);
    const unknownSexAgeSum = getAgeSum(unknownSexInfos);

    return {
      mascAvgAge: getRoundedNumber(mascAgeSum / mascInfos.length),
      femAvgAge: getRoundedNumber(femAgeSum / femInfos.length),
      unknownSexAvgAge: getRoundedNumber(
        unknownSexAgeSum / unknownSexInfos.length
      ),
      allPatients: getRoundedNumber(
        (mascAgeSum + femAgeSum + unknownSexAgeSum) /
          [...mascInfos, ...femInfos, ...unknownSexInfos].length
      ),
    };
  }

  function getRoundedNumber(n: number) {
    return Math.round(n * Math.pow(10, 2)) / Math.pow(10, 2);
  }

  function getInfosBySex(db: DatabaseJSONProps[]) {
    const mascInfos = db.filter((item) => item.paciente.sexo == SexTypes.masc);
    const femInfos = db.filter((item) => item.paciente.sexo == SexTypes.fem);
    const unknownSexInfos = db.filter(
      (item) => item.paciente.sexo === SexTypes.unknown
    );
    return { mascInfos, femInfos, unknownSexInfos };
  }

  function getAgeSum(array: DatabaseJSONProps[]) {
    const temp = array
      .flatMap((item) => parseInt(item.paciente.idade))
      .filter((item) => !isNaN(item));
    return temp.length > 0 ? temp.reduce((acc, cur) => acc + cur) : 0;
  }

  return (
    <Box>
      <CityFilter
        cityFilter={municipioFiltro}
        handleOnSubmit={handleSubmit}
        handleOnChange={onChangeInput}
      />

      <Paper>
        <Chart data={avgAges}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="info" argumentField="selector" />
          <Title text={graphTitle} />
          <Animation />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Paper>
    </Box>
  );
};

export default AgeTab;
