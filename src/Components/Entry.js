import React, { Component } from "react";
import { CATEGORIES } from "../Common/categories";

export default class Entry extends Component {
  render() {
    const { changeCat, amount, amountChange, replay } = this.props;
    return (
      <div className="quiz">
        <h1> Let's play</h1>
        <div>
          <h3>Choose Category</h3>
          <select className="select" onChange={changeCat} name="" id="">
            {CATEGORIES.map((item) => {
              return (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <div></div>
          <label>
            <div>Amount 1-50:</div>
            <input
              type="number"
              value={amount}
              onChange={amountChange}
              min="1"
              max="50"
              className="selectNumber"
            />
          </label>
        </div>
        <button onClick={replay} className="answerSpan">
          {" "}
          Click And Play
        </button>
      </div>
    );
  }
}
