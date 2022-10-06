import React from "react";

const ColActivoTabla = (props) => {
  return (
    <span
      className={
        props.activo ? "badge bg-light-success" : "badge bg-light-danger"
      }>
      {props.activo ? "SI" : "NO"}
    </span>
  );
};

export default ColActivoTabla;
