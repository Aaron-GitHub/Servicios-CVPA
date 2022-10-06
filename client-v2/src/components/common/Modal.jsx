import React from "react";
const Modal = (props) => {
  return (
    <div
      className="modal fade text-left"
      id={props.modalId}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel33"
      aria-hidden="true">
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable  modal-lg"
        role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="myModalLabel33">
              {props.ModalTitle}
            </h4>
            <button
              type="button"
              className="close"
              id="cerrar_modal_"
              data-bs-dismiss="modal"
              aria-label="Close">
              <i data-feather="x"></i>
            </button>
          </div>
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
