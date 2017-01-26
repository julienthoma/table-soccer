import React, { Component } from 'react';
import ExampleComponent from '../components/ExampleComponent';
import { connect } from 'react-redux';
import { setText } from '../actions/ExampleActions';

class App extends Component {
  render() {
    const { someText } = this.props;

    return (<ExampleComponent text={someText} handleClick={this.handleButtonClick} />)
  }

  handleButtonClick = () => {
    const { dispatch } = this.props;

    dispatch(setText(`Random Number: ${Math.random()}`));
  }
}

const mapStateToProps = state => ({
  someText: state.text
});

const _App = connect(mapStateToProps)(App);

export default _App;