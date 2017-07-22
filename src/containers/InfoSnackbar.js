import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { toggleSnackbar } from '../actions';
import { GOAL_TIMEOUT } from '../constants/';

class InfoSnackbar extends React.Component {
  handleActionClick = () => {
    this.props.callbackFn();
    this.props.dispatch(toggleSnackbar(''));
  };

  render() {
    const { infoText, actionText } = this.props;

    return (
      <Snackbar
        open={infoText !== ''}
        message={infoText}
        action={actionText}
        autoHideDuration={GOAL_TIMEOUT}
        onActionTouchTap={this.handleActionClick}
      />
    );
  }
}

InfoSnackbar.defaultProps = {
  infoText: '',
  callbackFn: () => true,
  actionText: null
};

InfoSnackbar.propTypes = {
  actionText: PropTypes.string,
  infoText: PropTypes.string,
  callbackFn: PropTypes.func,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ snackbar }) => ({
  infoText: snackbar.infoText,
  actionText: snackbar.actionText,
  callbackFn: snackbar.callbackFn
});

export default connect(mapStateToProps)(InfoSnackbar);
