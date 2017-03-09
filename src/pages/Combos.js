import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGames, getPlayers, getGamesByPlayerId } from '../helper';

class Combos extends Component {
  render() {
    const players = getPlayers().filter(player => {
      return getGamesByPlayerId(player.id).count() > 0;
    });
    const games = getGames();

    const comboMap = {};

    players.forEach(player => {
      comboMap[player.id] = {}

      players.forEach(_player => {
        comboMap[player.id][_player.id] = {
          count: 0,
          wins: 0
        }
      });
    });

    games.items.forEach(game => {
      const winner1 = game.winners[0].id;
      const winner2 = game.winners[1].id;
      const loser1 = game.losers[0].id;
      const loser2 = game.losers[1].id;

      comboMap[winner1][winner2].count++;
      comboMap[winner1][winner2].wins++;
      comboMap[winner2][winner1].count++;
      comboMap[winner2][winner1].wins++;

      comboMap[loser1][loser2].count++;
      comboMap[loser2][loser1].count++;
    });

    console.log(comboMap);

    return (
      <div className="combos">
        <div className="row">
          <div className="square"></div>
          {
            Object.keys(comboMap).map(player => {
              return (
                <div key={player} className="square">{player}</div>
              )
            })
          }
        </div>
        <div className="rows">
          {
            Object.keys(comboMap).map(player => {
              const subMap = comboMap[player];

              return (
                <div key={player}>
                  <Row
                    name={player}
                    subMap={subMap}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

const Row = ({ name, subMap }) => (
  <div className="row">
    <div className="square">{name}</div>
      {
        Object.keys(subMap).map(_player => {
          const combo = subMap[_player];

          return (
            <div className="square" key={_player}>
              {
                combo.count > 0 ?
                  <span className="combo-inner">
                    <span>{combo.count}</span>
                    <span>{((combo.wins / combo.count) * 100).toFixed(0)}%</span>
                  </span>
                  :
                  <span>-</span>
              }
            </div>
          )
        })
      }
  </div>
);


const mapStateToProps = state => ({
  players: state.players,
});

const _Combos = connect(mapStateToProps)(Combos);

export default _Combos;
