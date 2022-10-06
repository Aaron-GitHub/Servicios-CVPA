import React from "react";
import { Header, Modal } from "../../components";
import FormUsuario from "./components/FormUsuario";
import TablaUsuario from "./components/TablaUsuario";
import { UsuarioContextProvider } from "./context/usuarioContext";

const Usuario = () => {
  return (
    <UsuarioContextProvider>
      <Header titulo="Usuarios">
        <button
          type="button"
          className="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#usuario-modal">
          Nuevo Usuario
        </button>
      </Header>
      <div className="card-body">
        <TablaUsuario />

        <Modal ModalTitle="Usuarios" modalId="usuario-modal">
          <FormUsuario />
        </Modal>
      </div>
    </UsuarioContextProvider>
  );
};

export default Usuario;
