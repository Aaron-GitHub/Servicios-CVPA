import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer clearfix mb-0 text-muted">
        <div className="float-start">
          <p>2022 &copy; Servicios CVPA</p>
        </div>
        <div className="float-end">
          (C-S-A)-
          <span className="text-danger">
            <i className="bi bi-heart-fill icon-mid"></i>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
