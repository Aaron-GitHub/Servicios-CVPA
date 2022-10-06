import React, { useContext, useEffect } from "react";
import {
  Alerts,
  ColActivoTabla,
  OpcionesTabla,
  Tabla,
} from "../../../components";
import { useStateContext } from "../../../context/ContextProvider";
import { ProfesionContext } from "../context/profesionContext";

const TablaProfesion = () => {
  const { profesionList, obtenerProfesionList, obtenerProfesion } =
    useContext(ProfesionContext);
  const { mensaje } = useStateContext();

  const getProfesion = (props) => obtenerProfesion(props);

  useEffect(() => {
    obtenerProfesionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla
          editar={true}
          FnEditar={() => getProfesion(props)}
          nombreform="profesion"
        />
      ),
    },
  ];
  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={profesionList} />
    </>
  );
};

export default TablaProfesion;
