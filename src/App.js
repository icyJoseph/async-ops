import React, { Component } from "react";
import Clock from "./components/Clock";
import Counter from "./components/Counter";
import Header from "./components/Header";
import Switch, { toggleSwitch } from "./components/Switch";
import { CHECKBOX, TOGGLE_OFF } from "./constants";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    value: TOGGLE_OFF,
    checked: false
  };

  toggle = event => {
    const target = event.target;
    const value = target.type === CHECKBOX ? target.checked : target.value;
    return this.setState({
      value: toggleSwitch(value),
      checked: target.checked
    });
  };

  render() {
    const { value, checked } = this.state;
    return (
      <div className="App">
        <Header logo={logo} />
        <Switch value={value} toggle={this.toggle} />
        <Clock />
        <Counter checked={checked} />
      </div>
    );
  }
}

export default App;
