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
import pacienteReducer from "../reducer/pacienteReducer";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { useStateContext } from "../../../context/ContextProvider";

export const PacienteContext = createContext();

export const PacienteContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "paciente";

  const initialState = {
    pacienteList: [],
    pacienteActual: null,
  };

  const [state, dispatch] = useReducer(pacienteReducer, initialState);

  /* OBETENER LISTADO DE pacienteS */
  const obtenerPacienteList = async () => {
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

  /* OBTENER UN Paciente */
  const obtenerPaciente = async (paciente) => {
    try {
      let pacienteEncontrado = null;
      if (paciente !== null) {
        const resultado = await callEndpoint(getByID(urlApi, paciente.id));
        if (resultado && resultado.data) {
          pacienteEncontrado = resultado.data[0];
        }
      } else {
        pacienteEncontrado = paciente;
      }

      dispatch({
        type: OBTENER,
        payload: pacienteEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR PACIENTE */
  const registrarPaciente = async (paciente) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, paciente));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data[0],
      });
      alerta("success", "Paciente creado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar crear el paciente. ${error}`
      );
    }
  };

  /* ACTUALIZAR PACIENTE */
  const actualizarPaciente = async (paciente) => {
    try {
      const resultado = await callEndpoint(
        putObject(`${urlApi}/${paciente.id}`, paciente)
      );

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data[0],
      });
      alerta("success", "Paciente actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar actualizar el paciente. ${error}`
      );
    }
  };

  /* ELIMINAR PACIENTE */
  const eliminarPaciente = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Paciente eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar eliminar el paciente. ${error}`
      );
    }
  };

  return (
    <PacienteContext.Provider
      value={{
        pacienteList: state.pacienteList,
        pacienteActual: state.pacienteActual,

        obtenerPacienteList,
        obtenerPaciente,
        registrarPaciente,
        actualizarPaciente,
        eliminarPaciente,
      }}>
      {props.children}
    </PacienteContext.Provider>
  );
};
