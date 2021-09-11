import React, { useState } from "react";
import { NextPage } from "next";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";

import AgeTab from "../src/components/AgeTab";
import TabPanel from "../src/components/TabPanel";
import HospitalizedTab from "../src/components/HospitalizedTab/indes";
import PatientsTab from "../src/components/PatientsTab";

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
            <Tab label="Pacientes por Hospital" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      </Box>
      <Box px="14vw">
        <TabPanel value={value} index={0}>
          <AgeTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <HospitalizedTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PatientsTab />
        </TabPanel>
      </Box>
    </div>
  );
};

export default Home;
