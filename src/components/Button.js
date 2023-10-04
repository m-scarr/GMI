import React, { Component } from 'react';

export default class Button extends Component {
    style = {
        borderTop: "1px solid white",
        borderBottom: "1px solid white",
        marginTop: 16,
        marginBottom: 16,
        paddingTop: 8,
        paddingBottom: 8,
    }
    handleClick() {
        this.props.app.refObj[this.props.app.state.currentView].create()
    }

    render() {
        return (
            <div style={{ backgroundColor: "rgba(255,255,255,.1)" }}>
                <div style={{ ...this.style, ...this.props.style }} className={this.props.hoverable !== false ? "hoverable" : ""}
                    onClick={typeof this.props.onClick === "function" ? this.props.onClick.bind(this) : () => { }}>{this.props.children}</div></div>
        )
    }
}
