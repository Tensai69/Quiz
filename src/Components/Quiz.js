import React from "react";
import Error from "./Error";
import Loading from "./Loading";
import Entry from "./Entry";
import Finish from "./Finish";
import MainQuiz from "./MainQuiz";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedCategory: "",
      amount: "10",
      data: [],
      error: null,
      correctAnswers: 0,
      numberOfAnswer: 0,
      quizFinished: false,
      healthBar: 3,
      quizStarted: false,
      timerTime: "",
    };
  }
  getData = async () => {
    const { amount, selectedCategory } = this.state;
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${selectedCategory}&encode=url3986`
      );
      const parsed = await response.json();
      parsed.results.forEach((question) => {
        question.allAnswers = [].concat(
          question.correct_answer,
          question.incorrect_answers
        );
        question.allAnswers.sort(() => Math.random() - 0.5);
      });

      this.setState({ data: parsed.results });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  async componentDidMount() {
    setTimeout(this.getData, 500);
  }

  onAnswerClick = (e) => {
    let { healthBar } = this.state;
    const { data, numberOfAnswer } = this.state;
    const { value } = e.target;

    clearInterval(this.timerId);
    this.setState({
      timerTime: 15,
    });

    if (value === data[numberOfAnswer].correct_answer) {
      this.setState((prevState) => {
        return { correctAnswers: prevState.correctAnswers + 1 };
      });
    } else {
      healthBar--;
    }
    this.timer();
    if (numberOfAnswer < data.length - 1) {
      if (healthBar < 1) {
        this.setState({ quizFinished: true });
        return;
      }
      this.setState((prevState) => {
        return { numberOfAnswer: prevState.numberOfAnswer + 1, healthBar };
      });
    } else {
      this.setState({ quizFinished: true });
    }
  };

  changeCat = (event) => {
    this.setState({ selectedCategory: event.target.value });
  };

  replay = () => {
    this.getData();
    this.setState({
      loading: true,
      numberOfAnswer: 0,
      correctAnswers: 0,
      quizFinished: false,
      healthBar: 3,
      quizStarted: true,
      timerTime: 15,
    });
    this.timer();
  };
  mainMenu = () => {
    this.setState({
      quizFinished: false,
      quizStarted: false,
    });
  };
  amountChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  timer = () => {
    clearInterval(this.timerId);
    this.timerId = setInterval(
      () =>
        this.setState(
          (prevState) => {
            return { timerTime: prevState.timerTime - 1 };
          },
          () => {
            if (this.state.timerTime === 0) {
              this.setState({ quizFinished: true });
            }
          }
        ),
      1000
    );
  };
  render() {
    const {
      loading,
      error,
      numberOfAnswer,
      data,
      quizFinished,
      correctAnswers,
      quizStarted,
      timerTime,
      amount,
      healthBar,
    } = this.state;

    if (error) return <Error error={error} />;
    if (loading) return <Loading />;
    if (!quizStarted) {
      return (
        <Entry
          changeCat={this.changeCat}
          amountChange={this.amountChange}
          amount={amount}
          replay={this.replay}
        />
      );
    }
    if (quizFinished) {
      return (
        <Finish
          correctAnswers={correctAnswers}
          replay={this.replay}
          mainMenu={this.mainMenu}
        />
      );
    }
    return (
      <MainQuiz
        healthbar={healthBar}
        numberOfAnswer={numberOfAnswer}
        data={data}
        timerTime={timerTime}
        correctAnswers={correctAnswers}
        onAnswerClick={this.onAnswerClick}
      />
    );
  }
}
export default Quiz;
