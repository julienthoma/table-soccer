import React, { Component } from 'react';
import { getData } from '../actions';
import { connect } from 'react-redux'
import CustomToolbar from './CustomToolbar';
import NewGameButton from './NewGameButton';

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    console.log('will mount');
    dispatch(getData());
  }

  render() {
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

  handleAddClick = () => {
    console.log('addclick');
  }
}

const mapStateToProps = state => ({
  games: state.games,
  players: state.players
});

const _App = connect(mapStateToProps)(App);

export default _App;
