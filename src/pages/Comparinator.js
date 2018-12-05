import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerShape } from '../proptypes';
import PropertyChart from '../containers/PropertyChart';

const Comparinator = ({ match, players }) => {
  const player1 = players.filter(p => p.id === match.params.p1)[0];
  const player2 = players.filter(p => p.id === match.params.p2)[0];

  return (
    <div style={{ marginTop: 30 }}>
      <PropertyChart players={[player1, player2]} />
    </div>
  );
};

Comparinator.propTypes = {
  match: PropTypes.object.isRequired,
  players: PropTypes.arrayOf(playerShape).isRequired
};

const mapStateToProps = ({ app }) => ({
  players: app.players
});

export default connect(mapStateToProps)(Comparinator);
