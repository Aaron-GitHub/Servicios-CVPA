import React, { useContext, useEffect, useMemo, useState } from "react";
import { Buttons, Checkbox, InputText } from "../../../components";
import { ProfesionContext } from "../context/profesionContext";
import { closeModal } from "../../../utilities/Utiles";

const FormProfesion = () => {
  const {
    registrarProfesion,
    profesionActual,
    actualizarProfesion,
    obtenerProfesion,
  } = useContext(ProfesionContext);

  const profesionDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [profesion, setProfesion] = useState(profesionDefault);

  useEffect(() => {
    profesionActual !== null
      ? setProfesion(profesionActual)
      : setProfesion(profesionDefault);
  }, [profesionActual, profesionDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setProfesion({
          ...profesion,
          [e.target.name]: e.target.checked,
        })
      : setProfesion({
          ...profesion,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setProfesion(profesionDefault);
    obtenerProfesion(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    profesionActual !== null
      ? actualizarProfesion(ProfesionAEnviar())
      : registrarProfesion(ProfesionAEnviar());

    limpiaForm();
    closeModal();
  };
  const ProfesionAEnviar = () => {
    let profesionTmp = { ...profesion };
    return profesionTmp;
  };

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <div className="row">
        <div className="col-md-6 col-12">
          <div className="form-group">
            <InputText
              id="nombre"
              label="Nombre"
              placeholder="Nombre"
              name="nombre"
              required={true}
              onChangeFN={handleChange}
              value={profesion.nombre}
            />
          </div>
        </div>

        <div className="form-group col-md-6 col-12">
          <div className="form-check">
            <div className="checkbox">
              <Checkbox
                id="activo"
                name="activo"
                label="Activo"
                onChangeFN={handleChange}
                checked={profesion.activo}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer col-12 d-flex justify-content-end">
          <Buttons cancelFN={() => limpiaForm()} />
        </div>
      </div>
    </form>
  );
};

export default FormProfesion;
