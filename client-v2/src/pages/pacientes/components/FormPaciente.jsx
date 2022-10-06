import React, { useContext, useEffect, useMemo, useState } from "react";
import { Buttons, Checkbox, Header, InputText } from "../../../components";
import { PacienteContext } from "../context/pacienteContext";
import SelectProfesion from "../../../components/selects/SelectProfesion";
import { useNavigate, useParams } from "react-router-dom";

const FormPaciente = () => {
  const {
    registrarPaciente,
    pacienteActual,
    actualizarPaciente,
    obtenerPaciente,
  } = useContext(PacienteContext);

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
    };
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();

  const [paciente, setPaciente] = useState(pacienteDefault);

  useEffect(() => {
    pacienteActual !== null
      ? setPaciente(pacienteActual)
      : setPaciente(pacienteDefault);
  }, [pacienteActual, pacienteDefault]);

  const handleChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const limpiaForm = () => {
    setPaciente(pacienteDefault);
    obtenerPaciente(null);
    navigate("/pacientes");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    pacienteActual !== null
      ? actualizarPaciente(PacienteAEnviar())
      : registrarPaciente(PacienteAEnviar());

    limpiaForm();
  };
  const PacienteAEnviar = () => {
    let pacienteTmp = { ...paciente };
    return pacienteTmp;
  };

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <div className="row">
        <div className="col-md-4 col-12">
          <div className="form-group">
            <InputText
              id="nombres"
              label="Nombres"
              placeholder="Nombres"
              name="nombres"
              required={true}
              onChangeFN={handleChange}
              value={paciente.nombres}
            />
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="form-group">
            <InputText
              id="apellido_paterno"
              placeholder="Apellido Paterno"
              label="Apellido Paterno"
              name="apellido_paterno"
              required={true}
              onChangeFN={handleChange}
              value={paciente.apellido_paterno}
            />
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="form-group">
            <InputText
              id="apellido_materno"
              placeholder="Apellido Materno"
              label="Apellido Materno"
              name="apellido_materno"
              required={true}
              onChangeFN={handleChange}
              value={paciente.apellido_materno}
            />
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="form-group">
            <InputText
              id="run"
              name="run"
              placeholder="Run"
              label="Run"
              required={true}
              onChangeFN={handleChange}
              value={paciente.run}
            />
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="form-group">
            <InputText
              type="fono"
              id="fono"
              name="fono"
              placeholder="Telefono"
              label="Telefono"
              required={true}
              onChangeFN={handleChange}
              value={paciente.fono}
            />
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="form-group">
            <InputText
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              label="Fecha nacimiento"
              required={true}
              onChangeFN={handleChange}
              value={paciente.fecha_nacimiento}
            />
          </div>
        </div>

        <div className="col-md-12 col-12">
          <div className="form-group">
            <InputText
              id="direccion"
              name="direccion"
              placeholder="Dirección"
              label="Dirección"
              required={true}
              onChangeFN={handleChange}
              value={paciente.direccion}
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
              value={paciente.email}
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
              value={paciente.id_profesion}
            />
          </div>
        </div>

        <div className="form-group col-md-12 col-12">
          <div className="form-group mb-3">
            <label className="form-label">Motivo consulta</label>
            <textarea
              className="form-control"
              id="motivo_consulta"
              name="motivo_consulta"
              rows="3"
              onChange={handleChange}
              value={paciente.motivo_consulta}></textarea>
          </div>
        </div>

        <div className="modal-footer col-12 d-flex justify-content-end">
          <Buttons cancelFN={() => limpiaForm()} />
        </div>
      </div>
    </form>
  );
};

export default FormPaciente;
