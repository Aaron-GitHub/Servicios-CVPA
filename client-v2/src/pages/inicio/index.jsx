import React from "react";
import { Header } from "../../components";
import { FaHouseUser } from "react-icons/fa";

const index = () => {
  return (
    <>
      <Header titulo="Bienvenido" />
      <hr />
      <div className="card-body">
        <div className="row">
          <div className="card-header">
            <h4>Visitas para hoy</h4>
          </div>
          <div className="col-6 col-lg-4 col-md-6">
            <div className="card badge bg-light-info">
              <div className="card-body px-3 py-4-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stats-icon blue">
                      <FaHouseUser className="text-white" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6 className="text-muted font-semibold">
                      06-10-2022 18:30
                    </h6>
                    <h6 className="font-extrabold mb-0">Ana Trauco</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-4 col-md-6">
            <div className="card badge bg-light-info">
              <div className="card-body px-3 py-4-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stats-icon blue">
                      <FaHouseUser className="text-white" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6 className="text-muted font-semibold">
                      06-10-2022 20:30
                    </h6>
                    <h6 className="font-extrabold mb-0">
                      Lucho de los palotes
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-4 col-md-6">
            <div className="card badge bg-light-info">
              <div className="card-body px-3 py-4-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stats-icon blue">
                      <FaHouseUser className="text-white" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6 className="text-muted font-semibold">
                      06-10-2022 22:30
                    </h6>
                    <h6 className="font-extrabold mb-0">Otra persona</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="card-header">
            <h4>Visitas para Mañana</h4>
          </div>
          <div className="col-12 col-lg-4 col-md-6">
            <div className="card badge bg-light-success">
              <div className="card-body px-3 py-4-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stats-icon green">
                      <FaHouseUser className="text-white" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6 className="text-muted font-semibold">
                      07-10-2022 18:30
                    </h6>
                    <h6 className="font-extrabold mb-0">Ana Trauco</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4 col-md-6">
            <div className="card badge bg-light-success">
              <div className="card-body px-3 py-4-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stats-icon green">
                      <FaHouseUser className="text-white" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6 className="text-muted font-semibold">
                      07-10-2022 20:30
                    </h6>
                    <h6 className="font-extrabold mb-0">
                      Lucho de los palotes
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4 col-md-6">
            <div className="card badge bg-light-success">
              <div className="card-body px-3 py-4-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stats-icon green">
                      <FaHouseUser className="text-white" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6 className="text-muted font-semibold">
                      07-10-2022 22:30
                    </h6>
                    <h6 className="font-extrabold mb-0">Otra persona</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
