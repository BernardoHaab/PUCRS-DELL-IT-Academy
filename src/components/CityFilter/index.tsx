import { Button, TextField } from "@material-ui/core";
import React, { ChangeEvent, FC, FormEvent, useContext } from "react";
import DbContext from "../../contex/DbContext";
import DatabaseJSONProps from "../../types/DatabaseProps";
import useStyles from "./style";

type CityFilterProps = {
  handleOnSubmit: (filteredDb: DatabaseJSONProps[]) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  municipioFiltro: string;
};

const CityFilter: FC<CityFilterProps> = ({
  handleOnSubmit,
  onChange,
  municipioFiltro,
}) => {
  const { dbJson } = useContext(DbContext);
  const styles = useStyles();

  function validatorOnSubmit(e: FormEvent) {
    e.preventDefault();

    if (municipioFiltro.trim() === "") {
      return;
    }

    const filteredDb = dbJson.filter(
      (item) =>
        item.paciente.munResidencia.toLowerCase() ==
        municipioFiltro.toLowerCase()
    );

    handleOnSubmit(filteredDb);
  }

  return (
    <form className={styles.formContainer} onSubmit={validatorOnSubmit}>
      <TextField
        onChange={onChange}
        value={municipioFiltro}
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
