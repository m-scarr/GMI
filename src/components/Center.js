import React, { Component } from "react";

export default class Center extends Component {
    constructor(props) {
        super(props);
        this.style = {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        };
        this.contentStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div
                style={{ ...this.style, ...this.props.style }}
                onClick={(e) => {
                    if (typeof this.props.onClick === "function") {
                        this.props.onClick(e);
                    }
                }}
            >
                <div ref={this.contentRef} style={this.contentStyle}>{this.props.children}</div>
            </div>
        );
    }
}
