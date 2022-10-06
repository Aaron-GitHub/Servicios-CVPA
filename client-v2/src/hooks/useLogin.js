import useFetchAndLoad from "./useFetchAndLoad";
import { loginAdapter } from "../adapters/loginAdapter";
import { login, verificaToken } from "../services/usuarioService";
import { persistJwt, persistUsuarioState } from "../utilities/Login_utiles";
import { useStateContext } from "../context/ContextProvider";

const useLogin = () => {
  const { callEndpoint, setLoading } = useFetchAndLoad();
  const { setLogueado } = useStateContext();

  const entrar = async (correo, contrasena) => {
    const credenciales = loginAdapter(correo, contrasena);
    const jwt = await callEndpoint(login(credenciales));

    if (jwt && jwt.data) {
      await persistJwt(jwt.data.token);

      await setLogueado(true);

      await persistUsuarioState(jwt.data.user);

      return true;
    } else {
      return false;
    }
  };

  const verificar = async () => {
    return callEndpoint(verificaToken())
      .then((res) => {
        if (res !== undefined && res.data === true) return true;
        return false;
      })
      .catch((err) => {
        return false;
      });
  };

  return { entrar, verificar };
};

export default useLogin;
