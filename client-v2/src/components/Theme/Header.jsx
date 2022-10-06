import React from "react";

const Header = (props) => {
  return (
    <div className="card-header">
      <div className="float-start">
        <h2 className="">{props.titulo}</h2>
      </div>
      <div className="float-end">{props.children}</div>
    </div>
  );
};

export default Header;
