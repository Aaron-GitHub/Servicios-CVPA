import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/logo.png";

const Sidebar = () => {
  useEffect(() => {
    ocultaSideBar();
  }, []);

  const ocultaSideBar = () => {
    var w = window.innerWidth;
    if (w < 1200) {
      document.getElementById("sidebar").classList.remove("active");
    }
  };

  const menuActive = (e, id) => {
    let act = document.querySelectorAll(".active");
    act.forEach((item) => {
      if (item.classList.contains("submenu")) {
        item.classList.remove("active");
      }
      if (item.classList.contains("sidebar-item")) {
        item.classList.remove("active");
      }
    });

    let item = document.querySelector("#" + id);
    item.classList.add("active");
    if (item.classList.contains("has-sub")) {
      document.querySelector("#" + id + "-child").classList.add("active");
    } else {
      ocultaSideBar();
    }
    //
  };

  function PerfectScrollbar() {
    const container = document.querySelector(".sidebar-wrapper");
    const ps = new PerfectScrollbar(container, {
      wheelPropagation: false,
    });
  }

  window.addEventListener("DOMContentLoaded", (event) => {
    ocultaSideBar();
  });
  window.addEventListener("resize", (event) => {
    var w = window.innerWidth;
    if (w < 1200) {
      document.getElementById("sidebar").classList.remove("active");
    } else {
      document.getElementById("sidebar").classList.add("active");
    }
  });

  // Scroll into active sidebar
  //document.querySelector(".sidebar-item.active").scrollIntoView(false);

  return (
    <div id="sidebar" className="active">
      <div className="sidebar-wrapper active">
        <div className="sidebar-header">
          <div className="d-flex justify-content-between">
            <div className="logo">
              <Link to="/">
                <img src={img} alt="Logo" srcSet="" />
              </Link>
            </div>
            <div className="toggler">
              <a
                href="#"
                className="sidebar-hide d-xl-none d-block"
                onClick={() =>
                  document.getElementById("sidebar").classList.toggle("active")
                }>
                <i className="bi bi-x bi-middle"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="sidebar-title">Menu</li>

            <li className="sidebar-item" id="inicio">
              <Link
                to="/"
                className="sidebar-link"
                onClick={(e) => menuActive(e, "inicio")}>
                <i className="bi bi-grid-fill"></i>
                <span>Inicio</span>
              </Link>
            </li>

            <li className="sidebar-item" id="pacientes">
              <Link
                to="/pacientes"
                className="sidebar-link"
                onClick={(e) => menuActive(e, "pacientes")}>
                <i className="bi bi-person-badge-fill"></i>
                <span>Pacientes</span>
              </Link>
            </li>

            <li className="sidebar-item" id="calendario">
              <Link
                to="/calendario"
                className="sidebar-link"
                onClick={(e) => menuActive(e, "calendario")}>
                <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                <span>Calendario</span>
              </Link>
            </li>

            <li className="sidebar-item has-sub" id="components">
              <Link
                className="sidebar-link"
                onClick={(e) => menuActive(e, "components")}>
                <i className="bi bi-stack"></i>
                <span>Configuración</span>
              </Link>
              <ul className="submenu" id="components-child">
                <li className="sidebar-item">
                  <Link to="/usuarios" onClick={(e) => ocultaSideBar()}>
                    Usuarios
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/profesion" onClick={(e) => ocultaSideBar()}>
                    Profeción
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <button className="sidebar-toggler btn x">
          <i data-feather="x"></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
