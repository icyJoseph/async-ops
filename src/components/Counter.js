import React, { Component } from "react";

import {
  largeNumber,
  buildArrayAsync,
  makeArray as syncMakeArray
} from "../reduce";

const handler = (acc, val) => acc + val;

const asyncHandler = async (acc, val) => acc + val;

const toSeconds = (start, end) => ((end - start) / 1000).toFixed(1);

const button = {
  height: 20,
  width: 100,
  margin: 20,
  padding: "10px 20px",
  color: "white",
  borderRadius: "20px 20px",
  background: "palevioletred",
  cursor: "pointer"
};

const withMargin = {
  margin: 30
};

const initialState = {
  array: [],
  running: false,
  result: 0,
  start: 0,
  end: 0,
  jobStart: 0,
  jobEnd: 0
};

export class Counter extends Component {
  state = {
    ...initialState
  };

  componentDidUpdate(nextProps) {
    if (nextProps.checked !== this.props.checked) return this.softReset();
  }

  makeArray = () => {
    const { checked } = this.props;
    return Promise.resolve()
      .then(() => this.setState({ start: performance.now() }))
      .then(() => {
        return checked
          ? buildArrayAsync(largeNumber, 1)
          : syncMakeArray(largeNumber, 1);
      })
      .then(array => this.setState({ array }))
      .then(() => this.setState({ end: performance.now() }));
  };

  runJob = () => {
    const { checked } = this.props;
    return (
      this.state.array.length > 0 &&
      Promise.resolve()
        .then(() => this.setState({ jobStart: performance.now() }))
        .then(() =>
          this.props.reducer(
            this.state.array,
            checked ? asyncHandler : handler,
            0
          )
        )
        .then(result => this.setState({ result }))
        .then(() => this.setState({ jobEnd: performance.now() }))
    );
  };

  softReset = () =>
    this.setState({
      start: 0,
      end: 0,
      result: 0,
      jobEnd: 0,
      jobStart: 0
    });

  reset = () =>
    this.setState({
      array: [],
      start: 0,
      end: 0,
      result: 0,
      jobEnd: 0,
      jobStart: 0
    });

  render() {
    const { start, end, jobStart, jobEnd, result, array } = this.state;
    const buildTime = toSeconds(start, end);
    const jobTime = toSeconds(jobStart, jobEnd);
    return (
      <div style={withMargin}>
        <div style={withMargin}>Length of array: {array.length}</div>
        <a onClick={this.makeArray} style={button}>
          Make large array
        </a>
        <div style={withMargin}>Build time: {buildTime} seconds</div>
        <a onClick={this.runJob} style={button}>
          Start Job
        </a>
        <div style={{ ...withMargin, fontSize: "20pt" }}>{result}</div>
        <div style={withMargin}>Reducing time: {jobTime} seconds</div>
        <a onClick={this.reset} style={button}>
          Reset All
        </a>
      </div>
    );
  }
}

export default Counter;
