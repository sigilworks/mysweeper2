import React, { Component } from 'react';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        console.log("Settings: %o", this);
    }

    render() {
        return <div>
            <h1>Settings</h1>
            Hello, world!
        </div>
    }
}