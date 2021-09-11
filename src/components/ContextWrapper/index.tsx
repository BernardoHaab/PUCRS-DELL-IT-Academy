import React, { FC, useEffect, useState } from "react";
import Papa from "papaparse";

import DbContext from "../../context/DbContext";
import DatabaseJSONProps, {
  OriginaDatabaseProps,
} from "../../types/DatabaseProps";

type ContextWrapperProps = {
  children: JSX.Element;
};

const ContextWrapper: FC<ContextWrapperProps> = ({ children }) => {
  const [dbJson, setDbJson] = useState<DatabaseJSONProps[]>([]);

  useEffect(() => {
    Papa.parse("/db.csv", {
      download: true,
      header: true,
      complete: (data: Papa.ParseResult<never>) => {
        //carrega dados necessarios do .csv
        const loadedJson = data.data.map((item: OriginaDatabaseProps) => ({
          solicitante: item.solicitante,
          executante: item.executante,
          horasFila: item.horas_na_fila,
          dataSoli: item.data_solicitacao,
          dataAut: item.data_autorizacao,
          dataIntern: item.data_internacao,
          dataAlta: item.data_alta,
          munSolicitante: item.municipio_solicitante,
          paciente: {
            id: item.id_usuario,
            idade: item.idade,
            sexo: item.sexo,
            munResidencia: item.municipio_residencia,
          },
        }));
        //atualiza state
        loadedJson.pop();

        setDbJson(loadedJson);
      },
    });
  }, []);

  return <DbContext.Provider value={{ dbJson }}>{children}</DbContext.Provider>;
};

export default ContextWrapper;
