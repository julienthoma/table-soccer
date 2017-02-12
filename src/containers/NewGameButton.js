import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { withRouter } from 'react-router'
import { Link } from 'react-router'

class NewGameButton extends Component {
    render() {
      const currentPathName = this.props.router.getCurrentLocation().pathname;

      if (currentPathName === '/new') {
        return false;
      }

      const buttonStyle = {
        position: 'fixed',
        bottom: 20,
        right: 20
      }

      return (
        <FloatingActionButton style={buttonStyle} containerElement={<Link to="/new" />}>
          <ContentAdd />
        </FloatingActionButton>
      );
    }
}

const mapStateToProps = state => ({
});


const _NewGameButton = withRouter(connect(mapStateToProps)(NewGameButton));

export default _NewGameButton;
