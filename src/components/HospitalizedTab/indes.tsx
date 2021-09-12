import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { Box, Paper } from "@material-ui/core";
import DatabaseJSONProps from "../../types/DatabaseProps";
import CityFilter from "../CityFilter";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Title,
  Tooltip,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, EventTracker } from "@devexpress/dx-react-chart";
import BarGraphProps from "../../types/BarGraphProps";

const HospitalizedTab: FC = () => {
  const [municipioFiltro, setMunicipioFiltro] = useState("");
  const [hospitalizations, setHospitalizations] = useState<BarGraphProps[]>([]);
  const [graphTitle, setGraphTitle] = useState("Pesquise uma cidade");

  function handleOnSubmit(filteredDb: DatabaseJSONProps[]) {
    setGraphTitle(
      `Número de internados por ano da cidade de ${municipioFiltro}`
    );
    // Recebe o numero de itnenações por ano em formato de objeto
    const yearsHospitalizations = getYearsHospitalizations(filteredDb);

    // Transforma o obejto em um array com os anos de internações a paritr das chaves do obejto
    const years = Object.keys(yearsHospitalizations);
    // Transforma o objeto em um array com os numeros de itnernações a partir dos vcalores do objeto
    const ammounts: Array<number> = Object.values(yearsHospitalizations);

    const hospitalizationsObj = years.map((year, id) => {
      // retorna um objeto no formato esperado para a apresentação na DOM
      return {
        selector: year,
        info: ammounts[id],
      };
    });

    setHospitalizations(hospitalizationsObj);
  }

  function getYearsHospitalizations(array: DatabaseJSONProps[]) {
    const result = Object();

    array.forEach(function (item, id) {
      const date = new Date(item.dataIntern).getFullYear();

      if (!result[date]) {
        // Caso o objeto não tenho um valor para o ano indicado cria com o valor inicial de 1
        result[date] = 1;
      } else {
        // Soma 1 ao valor total de casos do ano indicado
        result[date]++;
      }
    });

    return result;
  }

  function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setMunicipioFiltro(e.target.value);
  }

  return (
    <Box>
      <CityFilter
        cityFilter={municipioFiltro}
        handleOnChange={onChangeInput}
        handleOnSubmit={handleOnSubmit}
      />

      <Paper>
        <Chart data={hospitalizations}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="info" argumentField="selector" />
          <Title text={graphTitle} />
          <Animation />
          <EventTracker />
          {/* Tooltip que apresenta o valo da barra quando se deixa o maus sobre ela */}
          <Tooltip />
        </Chart>
      </Paper>
    </Box>
  );
};

export default HospitalizedTab;
