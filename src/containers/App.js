import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getData, initializeFirebase } from '../actions';
import InfoSnackbar from './InfoSnackbar';
import CustomToolbar from './CustomToolbar';
import NewGameButton from './NewGameButton';

class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(initializeFirebase());
    this.props.dispatch(getData());
  }

  render() {
    const { initialized, isAuthorizing } = this.props;

    if (!initialized) {
      return false;
    }

    if (isAuthorizing) {
      return (<div>
        <p>Authorizing...</p>
      </div>);
    }

    return (
      <div>
        <CustomToolbar />
        <div className="container" style={{ maxWidth: 1300, margin: 'auto' }}>
          {this.props.children}
        </div>
        <NewGameButton />
        <InfoSnackbar />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialized: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  isAuthorizing: PropTypes.bool.isRequired
};

const mapStateToProps = ({ app, user }) => ({
  initialized: app.initialized,
  isAuthorizing: user.isAuthorizing
});

export default connect(mapStateToProps)(App);
