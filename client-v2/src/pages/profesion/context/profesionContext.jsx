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
import profesionReducer from "../reducer/profesionReducer";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { useStateContext } from "../../../context/ContextProvider";

export const ProfesionContext = createContext();

export const ProfesionContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "profesion";

  const initialState = {
    profesionList: [],
    profesionActual: null,
  };

  const [state, dispatch] = useReducer(profesionReducer, initialState);

  /* OBETENER LISTADO DE profesionS */
  const obtenerProfesionList = async () => {
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

  /* OBTENER UN Profesion */
  const obtenerProfesion = async (profesion) => {
    try {
      let profesionEncontrado = null;
      if (profesion !== null) {
        const resultado = await callEndpoint(getByID(urlApi, profesion.id));
        if (resultado && resultado.data) {
          profesionEncontrado = resultado.data[0];
        }
      } else {
        profesionEncontrado = profesion;
      }

      dispatch({
        type: OBTENER,
        payload: profesionEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR PROFESION */
  const registrarProfesion = async (profesion) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, profesion));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data[0],
      });
      alerta("success", "Profesion creado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar crear el profesion. ${error}`
      );
    }
  };

  /* ACTUALIZAR PROFESION */
  const actualizarProfesion = async (profesion) => {
    try {
      const resultado = await callEndpoint(
        putObject(`${urlApi}/${profesion.id}`, profesion)
      );

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data[0],
      });
      alerta("success", "Profesion actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar actualizar el profesion. ${error}`
      );
    }
  };

  /* ELIMINAR PROFESION */
  const eliminarProfesion = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Profesion eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar eliminar el profesion. ${error}`
      );
    }
  };

  return (
    <ProfesionContext.Provider
      value={{
        profesionList: state.profesionList,
        profesionActual: state.profesionActual,

        obtenerProfesionList,
        obtenerProfesion,
        registrarProfesion,
        actualizarProfesion,
        eliminarProfesion,
      }}>
      {props.children}
    </ProfesionContext.Provider>
  );
};
