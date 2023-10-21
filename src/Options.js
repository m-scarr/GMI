import React, { Component } from 'react';
import Button from './components/Button';

export let optionsInstance;

export class Options extends Component {
    state = { name: "", editable: false }

    constructor(props) {
        super(props);
        optionsInstance = this;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.app.state.currentGame !== this.props.app.state.currentGame && this.props.app.state.currentGame !== null) {
            this.setState({ name: this.props.app.state.currentGame.name, editable: false })
        }
    }

    update() {
        this.setState({ name: this.props.app.state.currentGame.name, editable: false })
    }

    handleChange(e) {
        this.setState({ name: e.target.value })
    }

    handleEditClick(e) {
        this.setState({ editable: !this.state.editable }, () => {
            if (!this.state.editable && this.state.name !== this.props.app.state.currentGame.name) {
                this.props.app.state.currentGame.set("name", this.state.name);
            }
        })
    }

    render() {
        return (
            <div>
                {this.props.app.state.currentGame === null ? null :
                    <Button hoverable={false} style={{ paddingTop: 4, paddingBottom: 0, display: "flex", flexDirection: "column" }}>
                        Game Name
                        <div style={{ display: "flex", flexDirection: "row", marginTop: 4 }}>
                            <input disabled={!this.state.editable} type="text" value={this.state.name} style={{ width: "100%" }} onChange={this.handleChange.bind(this)} />
                            <img className="edit-save-icon hoverable" alt="edit/save name" src={this.state.editable ? "./assets/check.png" : "./assets/edit.png"} onClick={this.handleEditClick.bind(this)} />
                        </div>
                    </Button>}
            </div>
        )
    }
}
