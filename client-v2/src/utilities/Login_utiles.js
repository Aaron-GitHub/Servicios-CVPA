/** PERSISTENCIA DE LA DATA **/
export const persistUsuarioState = (usuario) => {
  sessionStorage.setItem("user_info", JSON.stringify({ ...usuario }));
};

export const persistJwt = (jwt) => {
  sessionStorage.setItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF", jwt);
};

/*  Elimina los datos de sesion */
export const LogOut = () => {
  sessionStorage.clear();
  sessionStorage.removeItem("user_info");
  sessionStorage.removeItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF");
  //window.location.href = "/";
  return true;
};

/* Obtiene el usuario guardando en la sessionStorage  */
export const getUsuarioPersist = () => {
  let userPerfil = null;
  const usuarioLog = sessionStorage.getItem("user_info");
  const jwtLog = sessionStorage.getItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF");

  if (
    (usuarioLog !== "" || usuarioLog !== null || usuarioLog !== undefined) &&
    (jwtLog !== "" || jwtLog !== null || jwtLog !== undefined)
  ) {
    userPerfil = JSON.parse(usuarioLog);
  }
  return userPerfil;
};