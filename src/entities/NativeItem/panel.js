import React, { Component } from 'react';
import DeleteButton from '../../components/DeleteButton';

export let panelInstance;

export class NativeItemPanel extends Component {
    constructor(props) {
        super(props);
        panelInstance = this;
    }

    render() {
        return (
            <div>
                <DeleteButton entity={this.props.entity} />
            </div>
        )
    }
}
