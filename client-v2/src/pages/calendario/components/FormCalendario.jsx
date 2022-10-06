import React, { useContext, useEffect, useMemo, useState } from "react";
import { Buttons, InputText } from "../../../components";
import { closeModal } from "../../../utilities/Utiles";
import { CalendarioContext } from "../context/calendarioContext";

const FormCalendario = () => {
  const {
    registrarCalendario,
    calendarioActual,
    actualizarCalendario,
    obtenerCalendario,
  } = useContext(CalendarioContext);

  const calendarioDefault = useMemo(() => {
    return {
      id: 0,
      title: "",
      start: "",
      end: "",
      descripcion: "",
      color: "",
      activo: true,
    };
  }, []);

  const [calendario, setCalendario] = useState(calendarioDefault);

  const handleChange = (e) => {
    setCalendario({ ...calendario, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    calendarioActual !== null
      ? setCalendario(calendarioActual)
      : setCalendario(calendarioDefault);
  }, [calendarioActual, calendarioDefault]);

  const limpiaForm = () => {
    setCalendario(calendarioDefault);
    obtenerCalendario(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    calendarioActual !== null && calendarioActual.id !== 0
      ? actualizarCalendario(CalendarioAEnviar())
      : registrarCalendario(CalendarioAEnviar());

    limpiaForm();
    closeModal();
  };
  const CalendarioAEnviar = () => {
    let calendarioTmp = { ...calendario };
    return calendarioTmp;
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
              value={calendario.title}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-12">
          <div className="form-group">
            <InputText
              type="datetime-local"
              id="start"
              label="Inicio"
              placeholder="Inicio"
              name="start"
              required={true}
              onChangeFN={handleChange}
              value={calendario.start}
            />
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="form-group">
            <InputText
              type="datetime-local"
              id="end"
              label="Término"
              placeholder="Término"
              name="end"
              required={true}
              onChangeFN={handleChange}
              value={calendario.end}
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
            value={calendario.descripcion}></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 col-12">
          <div className="form-group">
            <InputText
              type="color"
              id="color"
              label="Color"
              placeholder="Color"
              name="color"
              required={true}
              onChangeFN={handleChange}
              value={calendario.color}
            />
          </div>
        </div>
        <div className="modal-footer col-12 d-flex justify-content-end">
          <Buttons cancelFN={() => limpiaForm()} />
        </div>
      </div>
    </form>
  );
};

export default FormCalendario;
