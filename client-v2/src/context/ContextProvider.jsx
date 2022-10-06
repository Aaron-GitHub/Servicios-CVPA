import { createContext, useContext, useState } from "react";
const StateContext = createContext();

const initialState = {
  usuario: [],
  logueado: false,
};

const initialAlertMensaje = {
  mensaje: null,
  tipoAlerta: null,
};

export const ContextProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(initialState);
  const [logueado, setLogueado] = useState(false);

  const [mensaje, SetMensaje] = useState(initialAlertMensaje);

  const alerta = (tipoAlerta, mensaje) => {
    SetMensaje({
      mensaje: mensaje,
      tipoAlerta: tipoAlerta,
    });

    setTimeout(() => {
      SetMensaje({
        mensaje: null,
        tipoAlerta: null,
      });
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{ usuario, setUsuario, logueado, setLogueado, alerta, mensaje }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
