import React, { useContext, useEffect, useMemo, useState } from "react";
import { Buttons, InputText } from "../../../components";
import { SelectPaciente, SelectProfesion } from "../../../components";
import { closeModal } from "../../../utilities/Utiles";
import { PacienteContext } from "../context/pacienteContext";

const FormSeguimiento = () => {
  const {
    registrarSeguimiento,
    seguimientoActual,
    actualizarSeguimiento,
    obtenerSeguimiento,
  } = useContext(PacienteContext);

  const seguimientoDefault = useMemo(() => {
    return {
      id: 0,
      title: "",
      start: "",
      end: "",
      descripcion: "",
      color: "",
      id_profesion: 0,
      nombre_profesion: "",
      id_paciente: 0,
      nombre_paciente: "",
      activo: true,
    };
  }, []);

  const [seguimiento, setSeguimiento] = useState(seguimientoDefault);

  const handleChange = (e) => {
    setSeguimiento({ ...seguimiento, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    seguimientoActual !== null
      ? setSeguimiento(seguimientoActual)
      : setSeguimiento(seguimientoDefault);
  }, [seguimientoActual, seguimientoDefault]);

  const limpiaForm = () => {
    setSeguimiento(seguimientoDefault);
    obtenerSeguimiento(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    seguimientoActual !== null && seguimientoActual.id !== 0
      ? actualizarSeguimiento(SeguimientoAEnviar())
      : registrarSeguimiento(SeguimientoAEnviar());

    limpiaForm();
    closeModal();
  };
  const SeguimientoAEnviar = () => {
    let seguimientoTmp = { ...seguimiento };
    return seguimientoTmp;
  };

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <div className="row">
        <div className="col-md-12 col-12">
          <div className="form-group">
            <InputText
              id="title"
              label="Titulo"
              placeholder="Titulo"
              name="title"
              required={true}
              onChangeFN={handleChange}
              value={seguimiento.title}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-12">
          <div className="form-group">
            <SelectProfesion
              id="id_profesion"
              name="id_profesion"
              label="Profesión"
              required={true}
              onChange={handleChange}
              value={seguimiento.id_profesion}
            />
          </div>
        </div>
      </div>

      <div className="form-group col-md-12 col-12">
        <div className="form-group mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            rows="3"
            onChange={handleChange}
            value={seguimiento.descripcion}></textarea>
        </div>
      </div>
      <div className="row">
        <div className="modal-footer col-12 d-flex justify-content-end">
          <Buttons cancelFN={() => limpiaForm()} />
        </div>
      </div>
    </form>
  );
};

export default FormSeguimiento;
