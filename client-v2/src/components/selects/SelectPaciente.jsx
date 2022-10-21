import React, { useContext } from "react";
import { SelectsContext } from "../../context/SelectsContext";

const SelectPaciente = (props) => {
  const { pacientesList } = useContext(SelectsContext);
  return (
    <fieldset className="form-group">
      <label>{props.label}</label>
      <select
        className="form-select"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}>
        <option defaultValue="00" key="00">
          Seleccione un paciente
        </option>
        {pacientesList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombres +
              " " +
              item.apellido_paterno +
              " " +
              item.apellido_materno}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default SelectPaciente;
