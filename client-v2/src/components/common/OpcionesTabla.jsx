import React from "react";
import { FaRegEdit, FaEye, FaHouseUser } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const OpcionesTabla = ({
  editar,
  FnEditar,
  ver,
  FnVer,
  seguimiento,
  FnSeguimiento,
  eliminar,
  FnEliminar,
  nombreform,
}) => {
  const buttonStyle =
    "text-white py-1 px-2 capitalize rounded-2xl text-md btn btn-sm icon ";

  return (
    <div className="buttons">
      {editar && (
        <button
          type="button"
          onClick={() => FnEditar()}
          className={`${buttonStyle} btn-primary`}
          data-bs-toggle="modal"
          data-bs-target={`#${nombreform}-modal`}>
          <FaRegEdit />
        </button>
      )}

      {ver && (
        <button
          type="button"
          onClick={() => FnVer()}
          className={`${buttonStyle} btn-info`}
          data-bs-toggle="modal"
          data-bs-target={`#${nombreform}-modal`}>
          <FaEye />
        </button>
      )}

      {seguimiento && (
        <button
          type="button"
          onClick={() => FnSeguimiento()}
          className={`${buttonStyle} btn-warning`}
          data-bs-toggle="modal"
          data-bs-target={`#${nombreform}-modal`}>
          <FaHouseUser />
        </button>
      )}

      {eliminar && (
        <button
          type="button"
          onClick={() => FnEliminar()}
          className={`${buttonStyle} btn-danger`}>
          <MdOutlineDelete />
        </button>
      )}
    </div>
  );
};

export default OpcionesTabla;
