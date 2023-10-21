import React, { Component } from 'react';
import Marker from "../../components/Marker";
import DeleteButton from '../../components/DeleteButton';
import MemberSelector from '../../components/MemberSelector';
import Roster from '../../components/Roster';

export let panelInstance;

export class GroupPanel extends Component {
    constructor(props) {
        super(props);
        panelInstance = this;
    }

    render() {
        return (
            <div>
                <Marker entity={this.props.entity} />
                <Roster entity={this.props.entity} />
                <MemberSelector entity={this.props.entity} />
                <DeleteButton entity={this.props.entity} />
            </div>
        )
    }
}
