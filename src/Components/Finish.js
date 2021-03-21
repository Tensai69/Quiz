import React, {Component} from 'react';

/*
const Finish = (props) => {

  let title;
  if (this.props.correctAnswers === 0) {
    title = "retard";
  }
  if (this.props.correctAnswers >= 1) {
    title = "200 IQ detected";
  }
  return (
    <div className="quiz">
      <h1>title</h1>
      <h3>{`Correct Answers : ${this.props.correctAnswers}`}</h3>
      <button onClick={this.props.replay}>TRY AGAIN</button>
      <br />
      <button onClick={this.props.mainMenu}>MAIN PAGE</button>
    </div>
  );
};

export default Finish;
*/


export default  class Finish extends Component {
  render() {
    const {correctAnswers, replay, mainMenu} = this.props
    let title;
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
  }
}