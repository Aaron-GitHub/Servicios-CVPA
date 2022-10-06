import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Header } from "../../components";
//import FormPaciente from "./components/FormPaciente";
//import TablaPaciente from "./components/TablaPaciente";
import { PacienteContextProvider } from "./context/pacienteContext";

const Paciente = () => {
  return (
    <PacienteContextProvider>
      <Header titulo="Pacientes">
        <Link to="/pacientes/nuevo" className="btn btn-outline-success">
          Nuevo Paciente
        </Link>
      </Header>
      <div className="card-body">
        <Outlet />
      </div>
    </PacienteContextProvider>
  );
};

export default Paciente;
