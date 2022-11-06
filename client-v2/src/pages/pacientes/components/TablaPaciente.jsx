import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alerts, OpcionesTabla, Tabla } from "../../../components";
import { useStateContext } from "../../../context/ContextProvider";
import { SelectsContext } from "../../../context/SelectsContext";
import { PacienteContext } from "../context/pacienteContext";

const TablaPaciente = () => {
  const { pacienteList, obtenerPacienteList, obtenerPaciente } =
    useContext(PacienteContext);

  const { obtenerProfesiones } = useContext(SelectsContext);

  const { mensaje } = useStateContext();
  const navigate = useNavigate();

  const getPaciente = (props) => {
    obtenerPaciente(props);
    navigate(props.id);
  };

  const verPaciente = (props) => {
    obtenerPaciente(props);
    navigate("ver/" + props.id);
  };

  const seguimientoPaciente = (props) => {
    obtenerPaciente(props);
    navigate("seguimiento/" + props.id);
  };

  useEffect(() => {
    obtenerPacienteList();
    obtenerProfesiones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    {
      name: "Nombre",
      selector: (row) =>
        row.nombres + " " + row.apellido_paterno + " " + row.apellido_materno,
      sortable: true,
    },
    { name: "Run", selector: (row) => row.run, sortable: true },
    { name: "Telefono", selector: (row) => row.fono, sortable: true },
    {
      name: "Acciones",
      cell: (props) => (
        <>
          <OpcionesTabla
            editar={true}
            FnEditar={() => getPaciente(props)}
            nombreform="paciente"
          />
          <OpcionesTabla
            ver={true}
            FnVer={() => verPaciente(props)}
            nombreform="paciente"
          />
          <OpcionesTabla
            seguimiento={true}
            FnSeguimiento={() => seguimientoPaciente(props)}
            nombreform="seguimiento"
          />
        </>
      ),
    },
  ];
  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={pacienteList} />
    </>
  );
};

export default TablaPaciente;
