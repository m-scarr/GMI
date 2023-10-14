import React, { Component } from 'react';
import Button from './Button';

export default class DeleteButton extends Component {
    render() {
        return <Button onClick={() => { this.props.entity.delete(); this.props.entity.game.app.set("currentEntity", null); }}>Delete</Button>;
    }
}
