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
  // Carrega do contexto da aplicação os dados do .csv salvos no estado da aplicação no formado de JSON
  const { dbJson } = useContext(DbContext);
  const styles = useStyles();

  function validatorOnSubmit(e: FormEvent) {
    // Garante que a pagina não será recarregado no envio do formulário
    e.preventDefault();

    if (executantFilter.trim() === "") {
      return;
    }

    const filteredDb = dbJson.filter(
      (item) => item.executante.toLowerCase() == executantFilter.toLowerCase()
    );

    if (filteredDb.length === 0) {
      alert("Executante não encontrado. Tente outro!");
    }

    // Chama a função passada por paramet para carregar os dados filtrados e exbilios na DOM
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
