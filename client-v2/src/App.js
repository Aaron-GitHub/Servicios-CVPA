import { BrowserRouter } from "react-router-dom";
import Rutas from "./routes/Rutas";
import "./assets/css/App.css";
import { Footer, Navbar, Sidebar } from "./components";
import { useStateContext } from "./context/ContextProvider";
import { Login } from "./pages";
import { getUsuarioPersist } from "./utilities/Login_utiles";
import { useEffect, useState } from "react";

const Aplicacion = () => {
  const [usuarioLog, SetUsuarioLog] = useState(null);

  useEffect(() => {
    SetUsuarioLog(getUsuarioPersist());
  }, []);

  
  return (
    <div id="app">
      <BrowserRouter>
        <Sidebar />
        <div id="main" className="layout-navbar">
          <Navbar usuario={usuarioLog} />
          <div id="main-content">
            <div className="page-heading">
              <section className="section">
                <div className="card">
                  <Rutas />
                </div>
              </section>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

function App() {
  const { logueado } = useStateContext();
  return logueado ? <Aplicacion /> : <Login />;
}

export default App;
