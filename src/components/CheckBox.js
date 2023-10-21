import React, { Component } from 'react';
import Button from "./Button";
import Center from "../components/Center";
import "./CheckBox.css";

export default class CheckBox extends Component {

    state = { checked: false };

    componentDidMount() {
        this.setState({ checked: this.props.value });
    }

    handleClick() {
        this.setState({ checked: !this.state.checked }, () => {
            this.props.onChange(this.state.checked);
        })
    }

    render() {
        return (
            <Button hoverable={false} style={{ paddingTop: 0, paddingBottom: 0, display: "flex" }}>
                <img className="hoverable checkbox" alt="checkbox" src={this.state.checked ? "./assets/checkbox_filled.png" : "./assets/checkbox_empty.png"} onClick={this.handleClick.bind(this)} />
                <div className="content-container">
                    <Center>
                        {this.props.children}
                    </Center>
                </div>
            </Button>
        )
    }
}
