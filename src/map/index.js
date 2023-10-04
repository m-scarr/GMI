import React, { Component } from 'react';
import "./style.css";
import functions from "./functions";
import drawing from "./drawing";

export let mapInstance;


export class Map extends Component {

    canvasRef = React.createRef();

    constructor(props) {
        super(props)
        mapInstance = this;
    }

    componentDidMount() {
        Object.keys(functions).forEach((func) => {
            this[func] = functions[func].bind(this)
        })
        Object.keys(drawing).forEach((func) => {
            this[func] = drawing[func].bind(this)
        })
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                className="map-canvas"
                width={window.innerWidth - 4}
                height={window.innerHeight - 4}
            />
        )
    }
}
