import React from "react";

const Error = ({ error }) => (
  <div className="quiz">{`Произошла ошибка: ${error.toString()}`}</div>
);

export default Error;
