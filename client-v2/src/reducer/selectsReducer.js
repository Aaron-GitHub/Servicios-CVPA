import { OBTENER_LISTA_PROFESIONES} from '../const/actionTypes';

export default (state, action) => {
    
    switch (action.type) {
        case OBTENER_LISTA_PROFESIONES:
            return {
                ...state,
                profesionesList: action.payload
            };
        
        default:
            return state;
    }
}