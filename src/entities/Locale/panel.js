import React, { Component } from 'react';
import Marker from "../../components/Marker";
import Map from '../../components/Map';
import DeleteButton from '../../components/DeleteButton';

export let panelInstance;

export class LocalePanel extends Component {
    constructor(props) {
        super(props);
        panelInstance = this;
    }

    render() {
        return (
            <div>{this.props.entity !== this.props.entity.game.overworldLocale ?
                <Marker entity={this.props.entity} /> : null}
                <Map entity={this.props.entity} />
                <DeleteButton entity={this.props.entity} />
            </div>
        )
    }
}
