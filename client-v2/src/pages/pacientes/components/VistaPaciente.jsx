import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PacienteContext } from "../context/pacienteContext";
import { FormatoFecha } from "../../../utilities/Utiles";

const VistaPaciente = () => {
  const pacienteDefault = useMemo(() => {
    return {
      id: 0,
      run: "",
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      fecha_nacimiento: "",
      fono: "",
      email: "",
      direccion: "",
      motivo_consulta: "",
      id_profesional_evaulador: 0,
      profesion: "",
    };
  }, []);

  const today = new Date().toISOString();

  const {
    obtenerPaciente,
    pacienteActual,
    obtenerCalendarioPacienteList,
    pacienteCalendarioList,
  } = useContext(PacienteContext);
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState(pacienteDefault);

  useEffect(() => {
    console.log(today);
    if (pacienteActual !== null) {
      obtenerCalendarioPacienteList(pacienteActual);
      setPaciente(pacienteActual);
    } else setPaciente(pacienteDefault);
  }, [pacienteActual, pacienteDefault]);

  const limpiaForm = () => {
    obtenerPaciente(null);
    navigate("/pacientes");
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Ficha de paciente (PCVPA-{paciente.id})</h4>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-3">
            <div
              className="nav flex-column nav-pills"
              id="v-ficha"
              role="tablist"
              aria-orientation="vertical">
              <a
                className="nav-link active"
                id="perfil"
                data-bs-toggle="pill"
                href="#v-perfil"
                role="tab"
                aria-controls="v-perfil"
                aria-selected="true">
                Perfil
              </a>
              <a
                className="nav-link"
                id="consulta"
                data-bs-toggle="pill"
                href="#v-consulta"
                role="tab"
                aria-controls="v-consulta"
                aria-selected="false">
                Motivo Consulta
              </a>
              <a
                className="nav-link"
                id="visitas"
                data-bs-toggle="pill"
                href="#v-visitas"
                role="tab"
                aria-controls="v-visitas"
                aria-selected="false">
                Visitas futuras
              </a>
              <a
                className="nav-link"
                id="visitas_futuras"
                data-bs-toggle="pill"
                href="#v-visitas_futuras"
                role="tab"
                aria-controls="v-visitas_futuras"
                aria-selected="false">
                Visitas pasadas
              </a>
            </div>
          </div>
          <div className="col-9">
            <div className="tab-content" id="v-fichaContent">
              <div
                className="tab-pane fade show active"
                id="v-perfil"
                role="tabpanel"
                aria-labelledby="perfil">
                <div className="table-responsive">
                  <table className="table table-borderless table-light mb-0">
                    <thead>
                      <tr>
                        <th width="30%">FICHA</th>
                        <th width="70%">PCVPA-{paciente.id}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-bold-900">
                          <b>Nombre</b>
                        </td>
                        <td>
                          {paciente.nombres +
                            " " +
                            paciente.apellido_paterno +
                            " " +
                            paciente.apellido_materno}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-bold-500">
                          <b>RUN</b>
                        </td>
                        <td>{paciente.run}</td>
                      </tr>
                      <tr>
                        <td className="text-bold-500">
                          <b>Dirección</b>
                        </td>
                        <td>{paciente.direccion}</td>
                      </tr>
                      <tr>
                        <td className="text-bold-500">
                          <b>Telefono</b>
                        </td>
                        <td>{paciente.fono}</td>
                      </tr>
                      <tr>
                        <td className="text-bold-500">
                          <b>Email</b>
                        </td>
                        <td>{paciente.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="v-consulta"
                role="tabpanel"
                aria-labelledby="v-consulta">
                <div
                  className="tab-pane fade show active"
                  id="v-consulta"
                  role="tabpanel"
                  aria-labelledby="v-consulta">
                  <div className="table-responsive">
                    <table className="table table-borderless table-light mb-0">
                      <thead>
                        <tr>
                          <th width="30%"></th>
                          <th width="70%"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-bold-900">
                            <b>Especialidad</b>
                          </td>
                          <td>{paciente.profesion}</td>
                        </tr>
                        <tr>
                          <td className="text-bold-900">
                            <b>Motivo de consulta</b>
                          </td>
                          <td>{paciente.motivo_consulta}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="v-visitas"
                role="tabpanel"
                aria-labelledby="visitas">
                <div className="list-group">
                  {pacienteCalendarioList.map((element) =>
                    element.start > today ? (
                      <span
                        key={element.id}
                        className={`list-group-item list-group-item-action`}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{element.title}</h5>
                          <small>
                            visita de <b>{element.nombre_profesion}</b>
                          </small>
                        </div>
                        <p className="mb-1">{element.descripcion}</p>
                        <small className={`badge bg-light-info`}>
                          {FormatoFecha(element.start)}
                        </small>
                      </span>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="v-visitas_futuras"
                role="tabpanel"
                aria-labelledby="visitas_futuras">
                <div className="list-group">
                  {pacienteCalendarioList.map((element) =>
                    element.start < today ? (
                      <span
                        key={element.id}
                        className={`list-group-item list-group-item-action list-group-item list-group-item-dark`}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{element.title}</h5>
                          <small>
                            visita de <b>{element.nombre_profesion}</b>
                          </small>
                        </div>
                        <p className="mb-1">{element.descripcion}</p>
                        <small className={`badge bg-light-danger`}>
                          {FormatoFecha(element.start)}
                        </small>
                      </span>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer col-12 d-flex justify-content-end">
        <button
          type="reset"
          className="btn btn-secondary me-1 mb-1"
          data-bs-dismiss="modal"
          onClick={() => limpiaForm()}>
          volver
        </button>
      </div>
    </div>
  );
};

export default VistaPaciente;
