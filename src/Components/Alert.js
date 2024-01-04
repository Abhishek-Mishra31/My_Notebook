import React from "react";

const Alert = (props) => {
  return (
    <div className="container">
      {props.alert && (
        <div className={`alert alert-${props.alert.type}`} role="alert">
          {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
