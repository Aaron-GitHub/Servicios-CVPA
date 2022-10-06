import { useEffect, useMemo } from "react";
import "../../assets/css/pages/auth.css";
import img from "../../assets/logo.png";
import imglogin from "../../assets/images/login.jpg";
import { useStateContext } from "../../context/ContextProvider";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { usuario, setUsuario, logueado, setLogueado } = useStateContext();
  const { entrar, verificar } = useLogin();

  const defaultData = useMemo(() => {
    return {
      email: "",
      pass: "",
    };
  }, []);

  useEffect(() => {
    verificar().then((res) => {
      res ? setLogueado(true) : setLogueado(false);
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    entrar(usuario.email, usuario.pass);
  };

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="auth">
      <div className="row h-100">
        <div className="col-lg-5 col-12">
          <div id="auth-left">
            <div className="auth-logo">
              <img src={img} alt="Logo" />
            </div>

            {window.location.search === "?forbiden" ? (
              <div className="alert alert-light-danger color-danger alert-dismissible show fade">
                <i className="bi bi-exclamation-circle"></i> Usuario o
                contraseña incorrectos.
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"></button>
              </div>
            ) : null}

            {window.location.search === "?Unauthorized" ? (
              <div className="alert alert-light-warning color-warning alert-dismissible show fade">
                <i className="bi bi-exclamation-triangle"></i> Debe volver a
                iniciar sesión
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"></button>
              </div>
            ) : null}

            <form onSubmit={handleLogin}>
              <div className="form-group position-relative has-icon-left mb-4">
                <input
                  name="email"
                  id="email"
                  type="text"
                  className="form-control form-control-xl"
                  placeholder="Correo"
                  onChange={handleChange}
                  required={true}
                />
                <div className="form-control-icon">
                  <i className="bi bi-person"></i>
                </div>
              </div>
              <div className="form-group position-relative has-icon-left mb-4">
                <input
                  name="pass"
                  id="pass"
                  type="password"
                  className="form-control form-control-xl"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  required={true}
                />
                <div className="form-control-icon">
                  <i className="bi bi-shield-lock"></i>
                </div>
              </div>

              <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5">
                Entrar
              </button>
            </form>
            <div className="text-center mt-5 text-lg fs-4">
              <p>
                <a className="font-bold" href="auth-forgot-password.html">
                  ¿Olvidó su contraseña?
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-7 d-none d-lg-block">
          <div id="auth-right">
            <img src={imglogin} alt="Logo" width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
