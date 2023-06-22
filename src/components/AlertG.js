import React from "react";

const AlertG = (props) => {
  const word = (e) => {
 if (e === "danger") {
  return e = "Error"  
 } else {
  return e
 }
  }
  return (
    <div className="Alert" style={{ height: "50px" }}>
      {props.alert && (
        <div className={`alert alert-${props.alert.type}`} role="alert">
          <strong>{word(props.alert.type)}</strong> : {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default AlertG;