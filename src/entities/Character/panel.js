import React, { Component } from 'react'

export let panelInstance;

export class CharacterPanel extends Component {
    constructor(props) {
        super(props);
        panelInstance = this;
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>{this.props.entity.fields.name}</div>
        )
    }
}
