import React, { Component } from 'react';
import { getData } from '../actions';
import { connect } from 'react-redux'
import CustomToolbar from './CustomToolbar';
import NewGameButton from './NewGameButton';

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getData());
  }

  render() {
    const { loaded } = this.props;

    if (!loaded) {
      return false;
    }

    return (
      <div>
        <CustomToolbar />
        <div className="container" style={{maxWidth: 900, margin: 'auto'}}>
          {this.props.children}
        </div>
        <NewGameButton />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.loaded
});

const _App = connect(mapStateToProps)(App);

export default _App;
