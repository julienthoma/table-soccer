import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerShape } from '../proptypes';
import PropertyChart from '../containers/PropertyChart';

const Comparinator = ({ params, players }) => {
  const player1 = players.filter(p => p.id === params.p1)[0];
  const player2 = players.filter(p => p.id === params.p2)[0];

  return (
    <div>
      <PropertyChart players={[player1, player2]} />
  </div>);
};

Comparinator.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  players: PropTypes.arrayOf(playerShape).isRequired
};

const mapStateToProps = state => ({
  players: state.app.players
});

const _Comparinator = connect(mapStateToProps)(Comparinator);

export default _Comparinator;
