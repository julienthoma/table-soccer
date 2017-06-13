import React from 'react';
import { connect } from 'react-redux';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { login, logout } from '../services/Auth';
import './Login.scss';

class Login extends React.Component {
  render() {
    const { currentUser } = this.props;
    const iconStyle = { width: 40, height: 40 };

    return (
      <div styleName="root">
        { currentUser ?
          <div styleName="avatarContainer">
            <div styleName="userName">
              { currentUser.displayName.split(' ')[0] }
            </div>
            <IconMenu
              iconButtonElement={
                <IconButton
                  touch
                  iconStyle={iconStyle}
                  style={{ padding: 0 }}
                  tooltipPosition="bottom-left"
                >
                  <Avatar
                    src={currentUser.photoURL}
                  />
                </IconButton>
              }
            >
              <MenuItem
                primaryText="Logout"
                onClick={logout}
              />
            </IconMenu>
          </div>
          :
          <IconMenu
            iconButtonElement={
              <IconButton
                touch
                iconStyle={iconStyle}
                style={{ padding: 0 }}
                tooltipPosition="bottom-left"
              >
                <AccountCircle />
              </IconButton>
            }
          >
            <MenuItem
              primaryText="Login"
              onClick={login}
            />
          </IconMenu>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const _Login = connect(mapStateToProps)(Login);

export default _Login;
