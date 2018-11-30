import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class NewGameButton extends React.Component {
  render() {
    const currentPathName = this.props.location.pathname;

    if (currentPathName === '/new') {
      return false;
    }

    const buttonStyle = {
      position: 'fixed',
      bottom: 20,
      right: 20
    };

    return (
      <FloatingActionButton
        style={buttonStyle}
        containerElement={<Link to="/new" />}
      >
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

NewGameButton.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NewGameButton);
