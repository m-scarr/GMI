import React, { Component } from 'react';
import "./NameInput.css";

export let nameInputInstance;

export class NameInput extends Component {
    state = { disabled: true, name: "" }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ disabled: true, name: this.props.entity.fields.name })
    }

    update() {
        this.setState({ disabled: true, name: this.props.entity.fields.name })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.entity !== this.props.entity) {
            this.update();
        }
    }


    render() {
        return (
            <div className="name-input-container" style={{ backgroundColor: this.props.entity.game.app.refObj[this.props.entity.category].color }}>
                <img className="hoverable" alt="back" src="./assets/back.png" onClick={() => { this.props.entity.game.app.set('currentEntity', null) }} />
                <input
                    type="text"
                    style={{
                        margin: 0,
                        height: '26px',
                        border: '2px solid ' + this.props.entity.game.app.refObj[this.props.entity.category].color,
                        color: 'white',
                        textShadow: '1px 0 0 black, -1px 0 0 black, 0 1px 0 black, 0 -1px 0 black, 1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black,' +
                            ` 2px 0 1px ${this.props.entity.game.app.refObj[this.props.entity.category].color}, -2px 0 1px ${this.props.entity.game.app.refObj[this.props.entity.category].color}` +
                            `, 0 2px 1px ${this.props.entity.game.app.refObj[this.props.entity.category].color}, 0 -2px 1px ${this.props.entity.game.app.refObj[this.props.entity.category].color}` +
                            `, 2px 2px 1px ${this.props.entity.game.app.refObj[this.props.entity.category].color}, -2px 2px 1px ${this.props.entity.game.app.refObj[this.props.entity.category].color}` +
                            `, -2px -2px 1px ${this.props.entity.game.app.refObj[this.props.entity.category].color} , 2px -2px 1px ${this.props.entity.game.app.refObj[this.props.entity.category].color}`
                    }}
                    value={this.state.name} onChange={(e) => {
                        this.setState({ name: e.target.value })
                    }}
                    disabled={this.state.disabled}
                />
                <img className="hoverable" alt="edit" src={this.state.disabled ? './assets/edit.png' : './assets/check.png'} onClick={() => {
                    this.setState({ disabled: !this.state.disabled }, () => {
                        if (this.state.disabled && this.state.name !== this.props.entity.fields.name) {
                            this.props.entity.set('name', this.state.name)
                        }
                    })
                }} />
            </div>
        )
    }
}
