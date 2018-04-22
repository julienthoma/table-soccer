import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import { browserHistory } from 'react-router';
import PlayerListItem from '../components/PlayerListItem';
import { GUEST } from '../constants';
import { playerShape } from '../proptypes';

class Players extends Component {
  handleRowClick = player => () => {
    browserHistory.push(`/player/${player.id}`);
  };

  render() {
    const tableColumnStyle = { padding: '3px', textAlign: 'center' };

    const { players } = this.props;

    return (
      <div>
        <Table allRowsSelected={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={tableColumnStyle}>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                Games
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                Wins%
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                MMR
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players
              .filter(p => p.id !== GUEST && p.placemnentFinished)
              .sort((p1, p2) => p2.elo - p1.elo)
              .map(player => (
                <PlayerListItem
                  key={player.id}
                  player={player}
                  handleClick={this.handleRowClick(player)}
                />
              ))}
          </TableBody>
        </Table>
        <h2>
          <center>Unranked</center>
        </h2>
        <Table allRowsSelected={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={tableColumnStyle}>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                Games
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                Wins%
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                MMR
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players
              .filter(p => p.id !== GUEST && !p.placemnentFinished)
              .sort((p1, p2) => p2.elo - p1.elo)
              .map(player => (
                <PlayerListItem
                  key={player.id}
                  player={player}
                  handleClick={this.handleRowClick(player)}
                />
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Players.propTypes = {
  players: PropTypes.arrayOf(playerShape).isRequired
};

const mapStateToProps = ({ app }) => ({
  players: app.players
});

export default connect(mapStateToProps)(Players);
