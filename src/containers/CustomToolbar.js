import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/svg-icons/action/view-list';
import Group from 'material-ui/svg-icons/social/group';
import Person from 'material-ui/svg-icons/social/person';
import Login from './Login';

class CustomToolbar extends React.Component {
  render() {
    const currentPathName = this.props.location.pathname;
    const iconStyle = { width: 40, height: 40 };

    if (currentPathName === '/new') {
      return false;
    }

    return (
      <Toolbar style={{ padding: '0 10px' }}>
        <ToolbarGroup>
          <IconButton
            iconStyle={iconStyle}
            style={{ padding: '5px' }}
            containerElement={<Link to="/games" />}
          >
            <List />
          </IconButton>
          <IconButton
            iconStyle={iconStyle}
            style={{ padding: '5px' }}
            containerElement={<Link to="/players" />}
          >
            <Person />
          </IconButton>

          <IconButton
            iconStyle={iconStyle}
            style={{ padding: '5px' }}
            containerElement={<Link to="/teams" />}
          >
            <Group />
          </IconButton>
        </ToolbarGroup>
        <Login />
      </Toolbar>
    );
  }
}

CustomToolbar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(CustomToolbar);
