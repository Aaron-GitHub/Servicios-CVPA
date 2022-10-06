import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR} from '../../../const/actionTypes';

export default (state, action) => {
    
    switch (action.type) {
        case OBTENER_LISTA:
            return {
                ...state,
                pacienteList: action.payload
            };
        case REGISTRAR:
            return {
                ...state,
                pacienteList: [...state.pacienteList, action.payload]
            };
        case OBTENER:
            return {
                ...state,
                pacienteActual: action.payload
            };
        case ACTUALIZAR:
            return {
                ...state,
                pacienteList: state.pacienteList.map(
                    paciente => paciente.id === action.payload.id ? action.payload : paciente
                )
            };
        case ELIMINAR:
            return {
                ...state,
                pacienteList: state.pacienteList.filter( paciente => paciente.id !== action.payload)
            }
        default:
            return state;
    }
}