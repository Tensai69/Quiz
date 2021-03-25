import React from "react";

const Finish = (props) => {
  const {correctAnswers, replay, mainMenu} = props
  let title = "";
  if (correctAnswers === 0) {
  title = "retard";
  }
  if (correctAnswers >= 1) {
  title = "200 IQ detected";
  }
  return (
    <div className="quiz">
      <h1>{title}</h1>
      <h3>{`Correct Answers : ${correctAnswers}`}</h3>
      <button onClick={replay}>TRY AGAIN</button>
      <br />
      <button onClick={mainMenu}>MAIN PAGE</button>
    </div>
  );
};

export default Finish;
