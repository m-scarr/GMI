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
        const ctx = this.canvasRef.current.getContext("2d")
        const img = new Image();
        img.src = "./assets/defaultMap.jpeg"
        img.onload = () => {
            console.log("!!!")
            ctx.drawImage(img, 200, -200, img.width / 3, img.height / 3);
        }
        img.onerror = (e) => {
            console.log(e)
        }
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
