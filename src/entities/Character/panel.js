import React, { Component } from 'react'
import Marker from '../../components/Marker';

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
            <div>
                <Marker entity={this.props.entity} />
            </div>
        )
    }
}
