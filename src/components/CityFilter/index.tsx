import { Button, TextField } from "@material-ui/core";
import React, { ChangeEvent, FC, FormEvent, useContext } from "react";
import DbContext from "../../context/DbContext";
import DatabaseJSONProps from "../../types/DatabaseProps";
import useStyles from "./style";

type CityFilterProps = {
  handleOnSubmit: (filteredDb: DatabaseJSONProps[]) => void;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  cityFilter: string;
};

const CityFilter: FC<CityFilterProps> = ({
  handleOnSubmit,
  handleOnChange,
  cityFilter,
}) => {
  const { dbJson } = useContext(DbContext);
  const styles = useStyles();

  function validatorOnSubmit(e: FormEvent) {
    e.preventDefault();

    if (cityFilter.trim() === "") {
      return;
    }

    const filteredDb = dbJson.filter(
      (item) =>
        item.paciente.munResidencia.toLowerCase() == cityFilter.toLowerCase()
    );

    handleOnSubmit(filteredDb);
  }

  return (
    <form className={styles.formContainer} onSubmit={validatorOnSubmit}>
      <TextField
        onChange={handleOnChange}
        value={cityFilter}
        id="munResidencia"
        label="Município"
        variant="outlined"
        required
      />
      <Button variant="contained" type="submit">
        Pesquisar
      </Button>
    </form>
  );
};

export default CityFilter;
