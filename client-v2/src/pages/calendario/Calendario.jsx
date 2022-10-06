import React from "react";
import { Header, Modal } from "../../components";
import FormCalendario from "./components/FormCalendario";
import FullCalendario from "./components/FullCalendario";
import { CalendarioContextProvider } from "./context/calendarioContext";

const Calendario = () => {
  return (
    <CalendarioContextProvider>
      <Header titulo="Calendario">
        <button
          id="agendar-new"
          type="button"
          className="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#agenda-modal">
          Agendar
        </button>
      </Header>
      <div className="card-body">
        <FullCalendario />

        <Modal ModalTitle="Agendar" modalId="agenda-modal">
          <FormCalendario />
        </Modal>
      </div>
    </CalendarioContextProvider>
  );
};

export default Calendario;
