import React from 'react';
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
    const { initialized } = this.props;

    if (!initialized) {
      return false;
    }

    return (
      <div>
        <CustomToolbar />
        <div
          className="container"
          style={{ maxWidth: 900, margin: 'auto' }}
        >
          {this.props.children}
        </div>
        <NewGameButton />
        <InfoSnackbar />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  initialized: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  initialized: state.app.initialized
});

const _App = connect(mapStateToProps)(App);

export default _App;
