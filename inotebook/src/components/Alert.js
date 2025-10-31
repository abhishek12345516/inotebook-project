import React from "react";

const Alert = (props) => {
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{props.alert.type === "danger" ? "Error" : "Success"}:</strong>{" "}
        {props.alert.msg}
      </div>
    )
  );
};

export default Alert;
