# Asynchronous Operations

## Challenge

Is it possible to keep a clock ticking while building a very large array? Say of 10 000 000 elements?

Making an array of length 7000000 synchronously, takes about 1.6 seconds, which means the clock will skip a beat. Find a way to do so without blocking the UI.

Inspiration taken from:

- [Chunks](https://stackoverflow.com/questions/10344498/best-way-to-iterate-over-an-array-without-blocking-the-ui)
- [Async Reducers](https://blog.bloomca.me/2018/01/27/asynchronous-reduce-in-javascript.html)

## Solution

_No webworkers_

`Async/await` and processing chunks.

This function takes the length of the very large array and the elements (elems) to use when filling the array.
Optionally a callback funciton to apply against the array when the job is done. If no callback is passed, the array is returned.
Optionally, also, a timeout, by default set to 200 ms.

This function, relies on chunk processor, to concat the element into the array in chunks, as long as the time for the task does not run out. This is handled in the while loop, which closes every 200 ms, by default. If the length after the while loop is still not the desired length, loop again.

When the length matches the desired length, apply the callback or return the array.

```js
export async function buildArrayAsync(length, elems, callback, timeout = 200) {
  let index = 0;
  let array = [];

  async function concat() {
    const startTime = now();

    while (index < length && now() - startTime <= timeout) {
      array.push(elems);
      ++index;
    }

    if (index < length) {
      setTimeout(concat, 1);
    } else if (index === length) {
      return typeof callback === "function" ? callback(array) : array;
    }
  }

  await concat();
}
```

### Demo Setup

A `React-App` with a `<Switch/>` handling the sync/async mode of operation, a `<Clock/>` and `<Counter/>`.

A set of functions to build arrays in both synchronous and asynchronous modes.

#### App

This React component controls the state of the Switch child, which is used to build in synchronous or asynchronous mode.
The Counter child receives the mode in the checked prop.
The Clock child handles its own state.

The Header component has no functional use for this demo.

```jsx
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
```

### Clock

Using a custom component [`react-clock`](https://www.npmjs.com/package/react-clock), which in `1 second` intervals will update its own state and set a `new Date()`, thus making the clock tick.

```jsx
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
```

### Counter

This component uses changes in the `checked` props to update itself. It has the array, and measurements for `performance.now()` when the array building process is started by the user and for completion of the process.

It also has a `callback` method to update its state with an array and the `performance.now()` value when setting the array.

It also has two methods to build arrays, which are used depending on the value of checked.

Lastly, a reset method to set everything back to initial state.

```jsx
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
    ...counterInitialState // array:[], start:0, end:0
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
```
