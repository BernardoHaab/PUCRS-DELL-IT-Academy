type DatabaseJSONProps = {
  solicitante: string,
  executante: string,
  horasFila: string,
  dataSoli: string,
  dataAut: string,
  dataIntern: string,
  dataAlta: string,
  munSolicitante: string,
  paciente: PacienteProps,
}

type PacienteProps = {
  id: string,
  idade: string,
  sexo: string,
  munResidencia: string,
}

export type OriginaDatabaseProps = {
  carater: string,
​​  central_regulacao_origem: string,
​​  codigo_cid: string,
​​  data_alta: string,
​​  data_autorizacao: string,
​​  data_extracao: string,
​​  data_internacao: string,
​​  data_solicitacao: string,
​​  executante: string,
​​  horas_na_fila: string,
​​  id_usuario: string,
​​  idade: string,
​​  municipio_residencia: string,
​​  municipio_solicitante: string,
​​  sexo: string,
​​  situacao: string,
​​  solicitante: string,
​​  tipo_internacao: string,
​​  tipo_leito: string,
}

export default DatabaseJSONProps;