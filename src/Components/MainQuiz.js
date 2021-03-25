import React from "react";

 const MainQuiz = (props) => {
    const {
      numberOfAnswer,
      data,
      correctAnswers,
      timerTime,
      healthBar,
      onAnswerClick,
    } = props;
    return (
      <div className="quiz">
        <h1>LET'S GO QUIZ</h1>
        <span className="healthBar"> &#9829; &#9829; &#9829; {healthBar}</span>
        <div>{`Progress: ${numberOfAnswer + 1} / ${data.length}`}</div>
        <div> {`Time left: ${timerTime}`}</div>
        <h3>QUESTION</h3>
        <div className="questionDiv">
          {" "}
          {decodeURIComponent(data[numberOfAnswer].question)}
        </div>
        <h3>ANSWERS</h3>
        <div className="answersList">
          {data[numberOfAnswer].allAnswers.map((answer, index) => (
            <button
              className="answerSpan"
              onClick={onAnswerClick}
              key={answer}
              value={answer}
            >
              {index + 1}: {decodeURIComponent(answer)}
            </button>
          ))}
        </div>

        <div className="correctAnswers">
          <hr />
          {`Correct Answers : ${correctAnswers}`}
        </div>
      </div>
    );


 }
export default MainQuiz