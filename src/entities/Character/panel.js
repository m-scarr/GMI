import React, { Component } from 'react';
import Marker from '../../components/Marker';
import DeleteButton from '../../components/DeleteButton';
import CheckBox from '../../components/CheckBox';

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
                <CheckBox value={this.props.entity.fields.unique} onChange={(value) => { this.props.entity.set("unique", value) }}>
                    Unique
                </CheckBox>
                <DeleteButton entity={this.props.entity} />
            </div>
        )
    }
}
