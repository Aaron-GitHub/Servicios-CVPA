import React from "react";
import { TbAlertTriangle } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const Alerts = (props) => {
  switch (props.type) {
    case "danger":
      return (
        <div className="alert alert-light-danger color-danger alert-dismissible show fade">
          <i className="bi bi-exclamation-circle"></i> {props.children}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"></button>
        </div>
      );

    case "success":
      return (
        <div className="alert alert-light-success color-success alert-dismissible show fade">
          <i className="bi bi-check-circle"></i> {props.children}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"></button>
        </div>
      );

    case "warning":
      return (
        <div className="alert alert-light-warning color-warning alert-dismissible show fade">
          <i className="bi bi-exclamation-triangle"></i> {props.children}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"></button>
        </div>
      );

    default:
      return (
        <div className="alert alert-light-secondary color-secondary alert-dismissible show fade">
          <i className="bi bi-star" />
          No se reconocio nungun tipo de alerta.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"></button>
        </div>
      );
  }
};

export default Alerts;
