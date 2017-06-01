import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

class Login extends React.Component {
  handleLoginClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  handleLogoutClick = () => {
    firebase.auth().signOut();
  }
  render() {
    const { currentUser } = this.props;
    const iconStyle = { width: 40, height: 40 };

    return (
      <div className="login">
        { currentUser ?
          <div className="login-avatar-container">
            <div className="login-username">
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
                onClick={this.handleLogoutClick}
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
              onClick={this.handleLoginClick}
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
