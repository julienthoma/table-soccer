import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Home from 'material-ui/svg-icons/action/home';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import {Link} from 'react-router'
import {withRouter} from 'react-router'

class CustomToolbar extends Component {
  render() {
    const currentPathName = this.props.router.getCurrentLocation().pathname;
    const iconStyle = {width: 36, height: 36};

    if (currentPathName === '/new') {
      return false;
    }

    return <Toolbar style={{padding: '0 10px'}}>
      <ToolbarGroup>
        <IconButton
          iconStyle={iconStyle}
          style={{padding: '5px'}}
          containerElement={<Link to="/games" />}
        >
          <Home />
        </IconButton>
        <IconButton
          iconStyle={iconStyle}
          style={{padding: '5px'}}
          containerElement={<Link to="/players" />}
        >
          <AccountBox />
        </IconButton>
      </ToolbarGroup>
    </Toolbar>
  }
}

CustomToolbar.propTypes = {}

const _CustomToolbar = withRouter(connect()(CustomToolbar));

export default _CustomToolbar;
