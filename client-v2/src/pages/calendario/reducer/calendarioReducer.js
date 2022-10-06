import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR} from '../../../const/actionTypes';

export default (state, action) => {
    
    switch (action.type) {
        case OBTENER_LISTA:
            return {
                ...state,
                calendarioList: action.payload
            };
        case REGISTRAR:
            return {
                ...state,
                calendarioList: [...state.calendarioList, action.payload]
            };
        case OBTENER:
            return {
                ...state,
                calendarioActual: action.payload
            };
        case ACTUALIZAR:
            return {
                ...state,
                calendarioList: state.calendarioList.map(
                    calendario => calendario.id === action.payload.id ? action.payload : calendario
                )
            };
        case ELIMINAR:
            return {
                ...state,
                calendarioList: state.calendarioList.filter( calendario => calendario.id !== action.payload)
            }
        default:
            return state;
    }
}