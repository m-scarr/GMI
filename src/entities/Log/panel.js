import React, { Component } from 'react'

export let panelInstance;

export class LogPanel extends Component {
    constructor(props) {
        super(props);
        panelInstance = this;
    }

    render() {
        return (
            <div>{this.props.entity.fields.name}</div>
        )
    }
}
