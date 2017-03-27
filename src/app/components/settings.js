import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {

    render() {
        console.log("Settings: %o", this);
        return <div>
            <h1>Settings</h1>
            Hello, world!
        </div>
    }
}



export default connect(
    // mapStateToProps
    (state, ownProps = {}) => {
        console.log('[state -> props] state: %o, ownProps: %o', state, ownProps);
        return { ...state.gameConfig };
    },
    // mapDispatchToProps
    (dispatch, ownProps = {}) => {
        console.log('[dispatch -> props] dispatch: %o, ownProps: %o', dispatch, ownProps);
        return ownProps;
    }
)(Settings);