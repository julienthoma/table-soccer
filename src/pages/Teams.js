import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import TeamListItem from '../components/TeamListItem';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

class Teams extends React.Component {
  // handleRowClick = game => () => {
  //   this.props.history.push(`/game/${game.id}`);
  // };

  render() {
    const { teams } = this.props;
    const _teams = Object.keys(teams)
      .map(key => teams[key])
      .filter(team => team.elo > 1500)
      .sort((a, b) => b.elo - a.elo);

    const tableColumnStyle = { padding: '3px', textAlign: 'center' };
    return (
      <Container>
        <Table allRowsSelected={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={tableColumnStyle}>
                ⚔️ Attack
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                🛡 Defense
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                Wins
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                Losses
              </TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>
                MMR
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {_teams.map(team => (
              <TeamListItem key={team.id} team={team} />
            ))}
          </TableBody>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  teams: app.teams
});

export default connect(mapStateToProps)(Teams);
