import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';
import Home from 'material-ui/svg-icons/action/home';
import { Link } from 'react-router'

class CustomToolbar extends Component {
    render() {
        return (
                <Toolbar style={{padding: '0 10px'}}>
                    <ToolbarGroup>
                        <IconButton
                            iconStyle={{width: 36, height: 36}}
                            style={{padding: '5px'}}
                            containerElement={<Link to="/games" />}
                            linkButton={true}
                        >
                            <Home />
                        </IconButton>
                        <IconButton
                            iconStyle={{width: 36, height: 36}}
                            style={{padding: '5px'}}
                            containerElement={<Link to="/current" />}
                            linkButton={true}
                        >
                            <AddCircle />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>

        );
    }
}

CustomToolbar.propTypes = {}

const _CustomToolbar = connect()(CustomToolbar);

export default _CustomToolbar;
