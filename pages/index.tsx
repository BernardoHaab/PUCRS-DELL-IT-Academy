import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";

import AgeTab from "../src/components/AgeTab";
import TabPanel from "../src/components/TabPanel";
import HospitalizedTab from "../src/components/HospitalizedTab/indes";
import PatientsTab from "../src/components/PatientsTab";
import HospitalizedTimeTab from "../src/components/HospitalizedTimeTab";
import LongerTimeTab from "../src/components/LongerTimeTab";

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
  const styles = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>PUCRS/DELL IT Academy</title>
      </Head>
      <div className={styles.root}>
        <Box py="8vh" mx="12vw" className={styles.boxRoot}>
          <Typography variant="h4">
            <Box textAlign="center" mb={4}>
              Encontre a informação que busca sobre Internações Hospitalares no
              Rio Grande do Sul
            </Box>
          </Typography>
          <AppBar position="static">
            {/* Lista de abas */}
            <Tabs
              value={value}
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChange}
              aria-label="Abas de busca"
            >
              <Tab
                label="[1] Consultar média de idade dos pacientes"
                {...a11yProps(0)}
              />
              <Tab
                label="[2] Consultar internações por ano"
                {...a11yProps(1)}
              />
              <Tab label="[3] Consultar hospitais" {...a11yProps(2)} />
              <Tab label="[4] Calcular tempo de internação" {...a11yProps(3)} />
              <Tab
                label="[5] Determinar  tempos  de  espera  na  fila"
                {...a11yProps(4)}
              />
            </Tabs>
          </AppBar>
        </Box>
        <Box px="14vw">
          {/* Componentes carregados quando a aba é selecionada */}
          <TabPanel value={value} index={0}>
            <AgeTab />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HospitalizedTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PatientsTab />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <HospitalizedTimeTab />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <LongerTimeTab />
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default Home;
