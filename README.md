# Asynchronous Operations

## Challenge

Is it possible to keep a clock ticking while building a very large array?

Making an array of length 7000000 synchronously, takes about 1.6 seconds, which means the clock will skip a beat. Find a way to do so without blocking the UI.

Inspiration taken from:

- [Chunks](https://stackoverflow.com/questions/10344498/best-way-to-iterate-over-an-array-without-blocking-the-ui)
- [Async Reducers](https://blog.bloomca.me/2018/01/27/asynchronous-reduce-in-javascript.html)

## Solution

_No webworkers_

`Async/await` and processing in chunks.

### Setup

A `React-App` with a `<Switch/>` handling the sync/async mode of operation, a `<Clock/>` and `<Counter/>`.

A set of functions to build arrays in both synchronous and asynchronous modes.

#### App

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
