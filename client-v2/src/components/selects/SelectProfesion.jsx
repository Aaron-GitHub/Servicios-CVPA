import { useContext } from "react";
import { SelectsContext } from "../../context/SelectsContext";

const SelectProfesion = (props) => {
  const { profesionesList } = useContext(SelectsContext);
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
          Seleccione una profesión
        </option>
        {profesionesList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default SelectProfesion;
