import React, { Component } from 'react';
import { getGames, getPlayers } from '../actions';
import { connect } from 'react-redux'
import GameListItem from '../components/GameListItem';
import GameDialog from './GameDialog';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getGames());
    dispatch(getPlayers());
  }

  render() {
    const { games, players } = this.props;
    const tableColumnStyle = {padding: '3px', textAlign: 'center'};
    return (
      <div>
        <Toolbar style={{padding: '0'}}>
          <ToolbarGroup>
            <IconButton
              iconStyle={{width: 36, height: 36}}
              style={{padding: '5px'}}
              onClick={this.handleAddClick}
            >
              <AddCircle />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <Table allRowsSelected={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={tableColumnStyle}>Rear</TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>Front</TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>Winner</TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>Loser</TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>Front</TableHeaderColumn>
              <TableHeaderColumn style={tableColumnStyle}>Rear</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.map((game, index) =>
              <GameListItem key={index} game={game}/>
            )}
          </TableBody>
        </Table>
       { players.length > 0 && <GameDialog />}
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