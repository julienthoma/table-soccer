import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { startLogin } from '../actions';
import { logout } from '../services/auth';
import { userShape } from '../proptypes';

const Login = ({ currentUser, dispatch }) => {
  const iconStyle = { width: 40, height: 40 };

  return (
    <div className="login__root">
      {currentUser
        ? <div className="login__avatarContainer">
          <div className="login__userName">
            {currentUser.name.split(' ')[0]}
          </div>
          <IconMenu
            iconButtonElement={
              <IconButton
                touch
                iconStyle={iconStyle}
                style={{ padding: 0 }}
                tooltipPosition="bottom-left"
              >
                <Avatar src={currentUser.photoURL} />
              </IconButton>
              }
          >
            <MenuItem primaryText="Logout" onClick={logout} />
          </IconMenu>
        </div>
        : <IconMenu
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
            onClick={() => dispatch(startLogin())}
          />
        </IconMenu>}
    </div>
  );
};

Login.defaultProps = {
  currentUser: null
};

Login.propTypes = {
  currentUser: userShape,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(Login);
