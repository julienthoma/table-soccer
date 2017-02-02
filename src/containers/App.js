import React, { Component } from 'react';
import { getGames, getPlayers } from '../actions';
import { connect } from 'react-redux'
import CustomToolbar from './CustomToolbar';

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getGames());
    dispatch(getPlayers());
  }

  render() {
    return (
      <div>
        <CustomToolbar />
        <div className="container" style={{maxWidth: 900, margin: 'auto'}}>
          {this.props.children}
        </div>
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
