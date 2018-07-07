import React, { Component } from "react";
import Clock from "./components/Clock";
import Counter from "./components/Counter";
import Switch, { toggleSwitch, TOGGLE_OFF } from "./components/Switch";
import { asyncReduce, reduce } from "./reduce";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    value: TOGGLE_OFF,
    checked: false
  };

  toggle = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    return this.setState({
      value: toggleSwitch(value),
      checked: target.checked
    });
  };

  render() {
    const { value, checked } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Switch value={value} toggle={this.toggle} />
        <div className="Wrapper">
          <Clock />
        </div>
        <div className="Wrapper">
          <Counter reducer={checked ? asyncReduce : reduce} checked={checked} />
        </div>
      </div>
    );
  }
}

export default App;
