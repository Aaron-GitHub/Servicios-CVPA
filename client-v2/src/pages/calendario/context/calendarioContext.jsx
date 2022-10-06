import React, { createContext, useReducer } from "react";
import {
  OBTENER,
  OBTENER_LISTA,
  REGISTRAR,
  ACTUALIZAR,
  ELIMINAR,
} from "../../../const/actionTypes";
import {
  getList,
  getByID,
  postObject,
  putObject,
  deleteObject,
} from "../../../services/genericService";
import calendarioReducer from "../reducer/calendarioReducer";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { useStateContext } from "../../../context/ContextProvider";

export const CalendarioContext = createContext();

export const CalendarioContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "calendario";

  const initialState = {
    calendarioList: [],
    calendarioActual: null,
  };

  const [state, dispatch] = useReducer(calendarioReducer, initialState);

  /* OBETENER LISTADO DE calendarioS */
  const obtenerCalendarioList = async () => {
    try {
      const resultado = await callEndpoint(getList(urlApi));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER UN Calendario */
  const obtenerCalendario = async (calendario) => {
    try {
      let calendarioEncontrado = null;
      if (calendario !== null) {
        const resultado = await callEndpoint(getByID(urlApi, calendario.id));
        if (resultado && resultado.data) {
          calendarioEncontrado = resultado.data[0];
        }
      } else {
        calendarioEncontrado = calendario;
      }

      dispatch({
        type: OBTENER,
        payload: calendarioEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR CALENDARIO */
  const registrarCalendario = async (calendario) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, calendario));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data[0],
      });
      alerta("success", "Calendario creado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar crear el calendario. ${error}`
      );
    }
  };

  /* ACTUALIZAR CALENDARIO */
  const actualizarCalendario = async (calendario) => {
    try {
      const resultado = await callEndpoint(
        putObject(`${urlApi}/${calendario.id}`, calendario)
      );

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data[0],
      });
      alerta("success", "Calendario actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar actualizar el calendario. ${error}`
      );
    }
  };

  /* ELIMINAR CALENDARIO */
  const eliminarCalendario = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Calendario eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar eliminar el calendario. ${error}`
      );
    }
  };

  /* OBTENER UN Calendario */
  const newCalendario = async (calendario) => {
    try {
      dispatch({
        type: OBTENER,
        payload: calendario,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CalendarioContext.Provider
      value={{
        calendarioList: state.calendarioList,
        calendarioActual: state.calendarioActual,

        obtenerCalendarioList,
        obtenerCalendario,
        registrarCalendario,
        actualizarCalendario,
        eliminarCalendario,
        newCalendario,
      }}>
      {props.children}
    </CalendarioContext.Provider>
  );
};
