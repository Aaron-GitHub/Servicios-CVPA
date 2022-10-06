import React, { useContext, useEffect } from "react";
import {
  Alerts,
  ColActivoTabla,
  OpcionesTabla,
  Tabla,
} from "../../../components";
import { useStateContext } from "../../../context/ContextProvider";
import { UsuarioContext } from "../context/usuarioContext";
import { SelectsContext } from "../../../context/SelectsContext";

const TablaUsuario = () => {
  const { usuarioList, obtenerUsuarioList, obtenerUsuario } =
    useContext(UsuarioContext);
  const { mensaje } = useStateContext();
  const { obtenerProfesiones } = useContext(SelectsContext);

  const getUsuario = (props) => obtenerUsuario(props);

  useEffect(() => {
    obtenerUsuarioList();
    obtenerProfesiones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      name: "Administrador",
      cell: (props) => <ColActivoTabla activo={props.administrador} />,
      sortable: true,
    },
    { name: "Id", selector: (row) => row.id, sortable: true },
    {
      name: "Nombre",
      selector: (row) => row.nombres + " " + row.apellidos,
      sortable: true,
    },
    {
      name: "Profesión",
      selector: (row) => row.profesion,
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
          FnEditar={() => getUsuario(props)}
          nombreform="usuario"
        />
      ),
    },
  ];
  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={usuarioList} />
    </>
  );
};

export default TablaUsuario;
