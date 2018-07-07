import React, { Component } from "react";
import Clock from "react-clock";
import "../App.css";

class Timer extends Component {
  state = {
    date: new Date()
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { date } = this.state;
    return (
      <div className="Wrapper">
        <Clock value={date} />
      </div>
    );
  }
}

export default Timer;
