import React from "react";
import { Header, Modal } from "../../components";
import FormProfesion from "./components/FormProfesion";
import TablaProfesion from "./components/TablaProfesion";
import { ProfesionContextProvider } from "./context/profesionContext";

const Profesion = () => {
  return (
    <ProfesionContextProvider>
      <Header titulo="Profesiones">
        <button
          type="button"
          className="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#profesion-modal">
          Nuevo Profesión
        </button>
      </Header>
      <div className="card-body">
        <TablaProfesion />

        <Modal ModalTitle="Profesiones" modalId="profesion-modal">
          <FormProfesion />
        </Modal>
      </div>
    </ProfesionContextProvider>
  );
};

export default Profesion;
