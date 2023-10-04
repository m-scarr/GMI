import React, { Component } from 'react';
import Button from './Button';

export default class AddButton extends Component {
    handleClick() {
        this.props.app.refObj[this.props.app.state.currentView].create()
    }

    render() {
        return (
            <Button onClick={this.handleClick.bind(this)}>+</Button>
        )
    }
}
