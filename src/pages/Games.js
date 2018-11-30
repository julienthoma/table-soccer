import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import GameList from '../components/GameList';
import { gameShape } from '../proptypes';

class Games extends React.Component {
  handleRowClick = game => () => {
    this.props.history.push(`/game/${game.id}`);
  };

render() {
    const { games } = this.props;

    return (
      <div style={{ padding: 8 }}>
        <GameList
          games={[...games].sort(
            (a, b) =>
              new Date(b.startdate).getTime() - new Date(a.startdate).getTime()
          )}
          handleRowClick={this.handleRowClick}
        />
      </div>
    );
  }
}

Games.propTypes = {
  games: PropTypes.arrayOf(gameShape).isRequired
};

const mapStateToProps = ({ app }) => ({
  games: app.games
});

export default connect(mapStateToProps)(Games);
