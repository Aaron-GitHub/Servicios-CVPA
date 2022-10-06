import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR} from '../../../const/actionTypes';

export default (state, action) => {
    
    switch (action.type) {
        case OBTENER_LISTA:
            return {
                ...state,
                profesionList: action.payload
            };
        case REGISTRAR:
            return {
                ...state,
                profesionList: [...state.profesionList, action.payload]
            };
        case OBTENER:
            return {
                ...state,
                profesionActual: action.payload
            };
        case ACTUALIZAR:
            return {
                ...state,
                profesionList: state.profesionList.map(
                    profesion => profesion.id === action.payload.id ? action.payload : profesion
                )
            };
        case ELIMINAR:
            return {
                ...state,
                profesionList: state.profesionList.filter( profesion => profesion.id !== action.payload)
            }
        default:
            return state;
    }
}