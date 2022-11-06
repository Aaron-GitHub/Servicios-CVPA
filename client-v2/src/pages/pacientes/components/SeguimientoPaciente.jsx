import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PacienteContext } from "../context/pacienteContext";
import { FormatoFecha } from "../../../utilities/Utiles";
import { Buttons, Checkbox, InputText, Modal } from "../../../components";
import FormSeguimiento from "./FormSeguimiento";

const SeguimientoPaciente = () => {
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
    // eslint-disable-next-line
  }, [pacienteActual, pacienteDefault]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const limpiaForm = () => {
    obtenerPaciente(null);
  };

  const volver = () => {
    obtenerPaciente(null);
    navigate("/pacientes");
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">
          Seguimiento de visitas paciente (PCVPA-{paciente.id} -{" "}
          {paciente.nombres + " " + paciente.apellido_paterno})
        </h4>
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
                id="visitas"
                data-bs-toggle="pill"
                href="#v-visitas"
                role="tab"
                aria-controls="v-visitas"
                aria-selected="false">
                Visitas
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
                          <button
                            type="button"
                            className="btn rounded-pill btn-outline-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#seguimiento-modal">
                            {" "}
                            Registrar Visita
                          </button>
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
          onClick={() => volver()}>
          volver
        </button>
      </div>

      <Modal ModalTitle="Seguimiento de visitas" modalId="seguimiento-modal">
        <form className="form" onSubmit={handleOnSubmit}>
          <div className="row">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-6">
                <InputText
                  type="datetime-local"
                  id="start"
                  label="Fecha y Hora de visita"
                  placeholder="Hora de visita"
                  name="start"
                  required={true}
                  onChangeFN={() => {}}
                />
              </div>
              <div className="form-group mb-6">
                <Checkbox
                  id="activo"
                  name="activo"
                  label=" Visita realizada"
                  onChangeFN={() => {}}
                  value={true}
                />
              </div>
            </div>
          </div>
          <br />
          <div className="form-group col-md-12 col-12">
            <div className="form-group mb-3">
              <label className="form-label">Comentario de la visita</label>
              <textarea
                className="form-control"
                id="descripcion"
                name="descripcion"
                rows="3"
                onChange={() => {}}
                value={paciente.descripcion}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="modal-footer col-12 d-flex justify-content-end">
              <Buttons cancelFN={() => limpiaForm()} />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SeguimientoPaciente;
