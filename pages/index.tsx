import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import Papa from "papaparse";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";

import DatabaseJSONProps, {
  OriginaDatabaseProps,
} from "../src/types/DatabaseProps";
import AgeTab from "../src/components/AgeTab";
import TabPanel from "../src/components/TabPanel";
import HospitalizedTab from "../src/components/HospitalizedTab/indes";
import DbContext from "../src/contex/DbContext";

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  boxRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Home: NextPage = () => {
  //define state onde serão guardados dados necessarios, e função para atualizar estes dados
  // const [dbJson, setDbJson] = useState<DatabaseJSONProps[]>([]);

  // useEffect(() => {
  //   Papa.parse("/db.csv", {
  //     download: true,
  //     header: true,
  //     complete: (data: Papa.ParseResult<never>) => {
  //       //carrega dados necessarios do .csv
  //       const loadedJson = data.data.map((item: OriginaDatabaseProps) => ({
  //         solicitante: item.solicitante,
  //         executante: item.executante,
  //         horasFila: item.horas_na_fila,
  //         dataAut: item.data_autorizacao,
  //         dataIntern: item.data_internacao,
  //         dataAlta: item.data_alta,
  //         munSolicitante: item.municipio_solicitante,
  //         paciente: {
  //           id: item.id_usuario,
  //           idade: item.idade,
  //           sexo: item.sexo,
  //           munResidencia: item.municipio_residencia,
  //         },
  //       }));
  //       //atualiza state
  //       loadedJson.pop();

  //       setDbJson(loadedJson);
  //     },
  //   });
  // }, []);
  const { dbJson } = useContext(DbContext);
  const styles = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.root}>
      <Box my="8vh" mx="12vw" className={styles.boxRoot}>
        <Typography variant="h4">
          <Box textAlign="center" mb={4}>
            Encontre a informação que busca sobre Internações em POA
          </Box>
        </Typography>
        <AppBar position="static">
          <Tabs
            color="primary.secundary"
            value={value}
            onChange={handleChange}
            aria-label="Abas de busca"
            centered
          >
            <Tab label="Média de Idade" {...a11yProps(0)} />
            <Tab label="Internados por Ano" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      </Box>
      <TabPanel value={value} index={0}>
        <AgeTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HospitalizedTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

export default Home;
