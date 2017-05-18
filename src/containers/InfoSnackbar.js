import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { toggleSnackbar } from '../actions';

class InfoSnackbar extends React.Component {
  handleActionClick = () => {
    this.props.callbackFn();
    this.props.dispatch(toggleSnackbar(''));
  }

  render() {
    const { infoText, actionText } = this.props;

    return (
      <Snackbar
        open={infoText !== ''}
        message={infoText}
        action={actionText}
        autoHideDuration={5000}
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
  actionText: React.PropTypes.string,
  infoText: React.PropTypes.string,
  callbackFn: React.PropTypes.func,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  infoText: state.snackbar.infoText,
  actionText: state.snackbar.actionText,
  callbackFn: state.snackbar.callbackFn
});

const _InfoSnackbar = connect(mapStateToProps)(InfoSnackbar);

export default _InfoSnackbar;
