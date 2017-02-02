import React from 'react';
import { FormattedDate } from 'react-intl';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { POSITIONS } from '../constants';

const ScoreTimeline = ({ game }) => {
  const tableColumnStyle = {padding: '3px', textAlign: 'center'};

  return (
    <Table allRowsSelected={false}>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={tableColumnStyle}>Time</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Player</TableHeaderColumn>
          <TableHeaderColumn style={tableColumnStyle}>Position</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {game.scoreTimeline.map((entry, index) =>
          <TableRow>
            <TableRowColumn style={tableColumnStyle}>
              <FormattedDate
                value={entry.timestamp}
                hour='numeric'
                minute='numeric'
                second='numeric'
              />
            </TableRowColumn>
            <TableRowColumn style={tableColumnStyle}>
              {entry.name}
            </TableRowColumn>

            <TableRowColumn style={tableColumnStyle}>
              {POSITIONS[entry.goalScorer]}
            </TableRowColumn>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ScoreTimeline;
