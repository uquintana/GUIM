import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  { Checkbox } from 'guim';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {checked: false};
  }

  onChange() {
    console.log('onChange', !this.state.checked)
    this.setState({checked: !this.state.checked});
  }

  render() {
    return (
      <div className="App">
        <span>Clik me</span>
        <Checkbox
          name="checkbox"
          checked={this.state.checked}
          onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}

export default App;