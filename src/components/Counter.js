import React, { Component } from "react";
import Common, { Button } from "./Common";
import {
  largeNumber,
  buildArraySync,
  buildArrayAsync,
  toSeconds
} from "../functions";
import {
  counterInitialState,
  LENGTH_OF_ARRAY,
  MAKE_LARGE_ARRAY,
  RESET,
  BUILD_TIME,
  UNIT_SECONDS
} from "../constants";
import "../App.css";

export class Counter extends Component {
  state = {
    ...counterInitialState
  };

  componentDidUpdate(nextProps) {
    if (nextProps.checked !== this.props.checked) return this.reset();
    else return null;
  }

  callback = start => array => {
    return this.setState({ array, start, end: performance.now() });
  };

  makeArraySync = () => {
    const start = performance.now();
    const array = buildArraySync(largeNumber, 1);
    return this.callback(start)(array);
  };

  makeArrayAsync = async () => {
    const start = performance.now();
    await buildArrayAsync(largeNumber, 1, this.callback(start), 100);
  };

  reset = () =>
    this.setState({
      ...counterInitialState
    });

  render() {
    const { start, end, array } = this.state;
    const { checked } = this.props;
    const buildTime = toSeconds(start, end);
    return (
      <div className="Wrapper">
        <Common>
          <Common>
            {LENGTH_OF_ARRAY}
            {array.length}
          </Common>
          <Button onClick={checked ? this.makeArrayAsync : this.makeArraySync}>
            {MAKE_LARGE_ARRAY}
          </Button>
          <Common>
            {BUILD_TIME}
            {buildTime}
            {UNIT_SECONDS}
          </Common>
          <Button onClick={this.reset}>{RESET}</Button>
        </Common>
      </div>
    );
  }
}

export default Counter;
