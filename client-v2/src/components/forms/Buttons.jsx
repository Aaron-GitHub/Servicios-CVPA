/* BUTTONS SUBMIT Y CANCEL */
const Buttons = ({ cancelFN }) => {
  return (
    <>
      <button
        type="reset"
        className="btn btn-light-secondary me-1 mb-1"
        data-bs-dismiss="modal"
        onClick={() => cancelFN()}>
        Cancelar
      </button>

      <button type="submit" className="btn btn-primary me-1 mb-1">
        Guardar
      </button>
    </>
  );
};

export default Buttons;
