import React, { useContext, useEffect, useMemo, useState } from "react";
import { Buttons, Checkbox, InputText } from "../../../components";
import { UsuarioContext } from "../context/usuarioContext";
import { closeModal } from "../../../utilities/Utiles";
import SelectProfesion from "../../../components/selects/SelectProfesion";

const FormUsuario = () => {
  const { registrarUsuario, usuarioActual, actualizarUsuario, obtenerUsuario } =
    useContext(UsuarioContext);

  const usuarioDefault = useMemo(() => {
    return {
      id: 0,
      nombres: "",
      apellidos: "",
      run: "",
      email: "",
      id_profesion: 0,
      profesion: "",
      activo: false,
      administrador: false,
    };
  }, []);

  const [usuario, setUsuario] = useState(usuarioDefault);

  useEffect(() => {
    usuarioActual !== null
      ? setUsuario(usuarioActual)
      : setUsuario(usuarioDefault);
  }, [usuarioActual, usuarioDefault]);

  const handleChange = (e) => {
    if (e.target.name === "activo")
      setUsuario({ ...usuario, [e.target.name]: e.target.checked });
    else if (e.target.name === "administrador")
      setUsuario({ ...usuario, [e.target.name]: e.target.checked });
    else if (e.target.name === "id_profesion")
      setUsuario({
        ...usuario,
        [e.target.name]: e.target.value,
        ["profesion"]: e.target.options[e.target.selectedIndex].text,
      });
    else setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const limpiaForm = () => {
    setUsuario(usuarioDefault);
    obtenerUsuario(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    usuarioActual !== null
      ? actualizarUsuario(UsuarioAEnviar())
      : registrarUsuario(UsuarioAEnviar());

    limpiaForm();
    closeModal();
  };
  const UsuarioAEnviar = () => {
    let usuarioTmp = { ...usuario };
    return usuarioTmp;
  };

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <div className="row">
        <div className="col-md-6 col-12">
          <div className="form-group">
            <InputText
              id="nombres"
              label="Nombres"
              placeholder="Nombres"
              name="nombres"
              required={true}
              onChangeFN={handleChange}
              value={usuario.nombres}
            />
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="form-group">
            <InputText
              id="apellidos"
              placeholder="Apellidos"
              label="Apellidos"
              name="apellidos"
              required={true}
              onChangeFN={handleChange}
              value={usuario.apellidos}
            />
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="form-group">
            <InputText
              id="run"
              name="run"
              placeholder="Run"
              label="Run"
              required={true}
              onChangeFN={handleChange}
              value={usuario.run}
            />
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="form-group">
            <InputText
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              label="Email"
              required={true}
              onChangeFN={handleChange}
              value={usuario.email}
            />
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="form-group">
            <SelectProfesion
              id="id_profesion"
              name="id_profesion"
              label="Profesión"
              required={true}
              onChange={handleChange}
              value={usuario.id_profesion}
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
                checked={usuario.activo}
              />
            </div>
          </div>
        </div>
        <div className="form-group col-12">
          <div className="form-check">
            <div className="checkbox">
              <Checkbox
                id="administrador"
                name="administrador"
                label="Usuario Administrador"
                onChangeFN={handleChange}
                checked={usuario.administrador}
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

export default FormUsuario;
