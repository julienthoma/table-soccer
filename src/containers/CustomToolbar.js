import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { Link, withRouter } from 'react-router';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/svg-icons/action/view-list';
import Group from 'material-ui/svg-icons/social/group';
import Login from './Login';

class CustomToolbar extends React.Component {
  render() {
    const currentPathName = this.props.router.getCurrentLocation().pathname;
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
            <Group />
          </IconButton>
        </ToolbarGroup>
        <Login />
      </Toolbar>
    );
  }
}

CustomToolbar.propTypes = {
  router: PropTypes.instanceOf(Object).isRequired
};

export default withRouter(CustomToolbar);
