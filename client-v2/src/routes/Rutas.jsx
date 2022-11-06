import { Routes, Route } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import {
  Calendario,
  ErrorPage,
  Inicio,
  Paciente,
  Profesion,
  Usuario,
} from "../pages";
import FormPaciente from "../pages/pacientes/components/FormPaciente";
import TablaPaciente from "../pages/pacientes/components/TablaPaciente";
import VistaPaciente from "../pages/pacientes/components/VistaPaciente";
import SeguimientoPaciente from "../pages/pacientes/components/SeguimientoPaciente";

const Rutas = () => {
  return (
    <Routes>
      {/* Pagina de Error */}
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<Inicio />}></Route>

      <Route element={<AuthGuard />}>
        <Route path="/inicio" element={<Inicio />} />
        {/* Administración */}
        <Route path="/calendario" element={<Calendario />}></Route>
        <Route path="/usuarios" element={<Usuario />}></Route>

        <Route path="/pacientes" element={<Paciente />}>
          <Route index element={<TablaPaciente />}></Route>
          <Route path="nuevo" element={<FormPaciente />}></Route>
          <Route path=":id" element={<FormPaciente />}></Route>
          <Route path="ver/:id" element={<VistaPaciente />}></Route>
          <Route
            path="seguimiento/:id"
            element={<SeguimientoPaciente />}></Route>
        </Route>

        <Route path="/profesion" element={<Profesion />}></Route>
      </Route>
    </Routes>
  );
};

export default Rutas;
