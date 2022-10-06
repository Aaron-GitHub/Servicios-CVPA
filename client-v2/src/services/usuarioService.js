import { loadAbortAxios } from '../utilities/loadAbortAxios';
import AxiosInstance from '../interceptors/AxiosInstance';


export const login = (credenciales) => {
    const controller = loadAbortAxios();
    return { call: AxiosInstance.post(`auth`, credenciales , { signal: controller.signal}), controller };
    //return { type: 'post', url: 'login', data: credenciales, signal: controller.signal, control: controller }
}

export const verificaToken = () => {
    const controller = loadAbortAxios();
    return { call: AxiosInstance.post(`auth/verify`, { signal: controller.signal}), controller };
}