import { createContext, useReducer } from "react";
import { OBTENER_LISTA_PROFESIONES } from "../const/actionTypes";
import { getList } from "../services/genericService";
import selectsReducer from "../reducer/selectsReducer";
import useFetchAndLoad from "../hooks/useFetchAndLoad";

export const SelectsContext = createContext();

export const SelectsContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const initialState = {
    profesionesList: [],
  };

  const [state, dispatch] = useReducer(selectsReducer, initialState);

  /* OBETENER LISTADO DE PROFESIONES ACTIVAS */
  const obtenerProfesiones = async () => {
    try {
      const resultado = await callEndpoint(getList("profesion"));
      if (resultado && resultado.data) {
        let profesionesActivas = [];
        resultado.data.forEach((item) => {
          item.activo && profesionesActivas.push(item);
        });

        dispatch({
          type: OBTENER_LISTA_PROFESIONES,
          payload: profesionesActivas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SelectsContext.Provider
      value={{
        profesionesList: state.profesionesList,

        obtenerProfesiones,
      }}>
      {props.children}
    </SelectsContext.Provider>
  );
};
