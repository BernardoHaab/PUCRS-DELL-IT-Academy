import { Button, TextField } from "@material-ui/core";
import React, { ChangeEvent, FC, FormEvent, useContext } from "react";

import useStyles from "./style";

import DbContext from "../../context/DbContext";
import DatabaseJSONProps from "../../types/DatabaseProps";

type ExecutantFilterProps = {
  handleOnSubmit: (filteredDb: DatabaseJSONProps[]) => void;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  executantFilter: string;
};

const ExecutantFilter: FC<ExecutantFilterProps> = ({
  handleOnSubmit,
  handleOnChange,
  executantFilter,
}) => {
  const { dbJson } = useContext(DbContext);
  const styles = useStyles();

  function validatorOnSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(dbJson);

    if (executantFilter.trim() === "") {
      return;
    }

    const filteredDb = dbJson.filter(
      (item) => item.executante.toLowerCase() == executantFilter.toLowerCase()
    );

    handleOnSubmit(filteredDb);
  }

  return (
    <form className={styles.formContainer} onSubmit={validatorOnSubmit}>
      <TextField
        onChange={handleOnChange}
        value={executantFilter}
        id="executant"
        label="Executante (Hospital)"
        variant="outlined"
        required
      />
      <Button variant="contained" type="submit">
        Pesquisar
      </Button>
    </form>
  );
};

export default ExecutantFilter;
