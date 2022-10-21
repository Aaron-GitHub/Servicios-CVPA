import { OBTENER_LISTA_PROFESIONES, OBTENER_LISTA_PACIENTES} from '../const/actionTypes';

export default (state, action) => {
    
    switch (action.type) {
        case OBTENER_LISTA_PROFESIONES:
            return {
                ...state,
                profesionesList: action.payload
            };
            
        case OBTENER_LISTA_PACIENTES:
            return {
                ...state,
                pacientesList: action.payload
            };
        default:
            return state;
    }
}