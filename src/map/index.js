import React, { Component } from 'react';
import "./style.css";
import functions from "./functions";
import draw from "./draw";


export class Map extends Component {

    canvasRef = React.createRef();

    state = {
        timeout: null,
        x: 0,
        y: 0,
        zoom: 1,
        mouseX: 0,
        mouseY: 0,
        clickX: 0,
        clickY: 0,
        clicked: false,
        hoverEntity: null,
        animationFrame: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ animationFrame: requestAnimationFrame(this.draw.bind(this)) })
    }

    handleMouseEnter(e) { functions.handleMouseEnter(this, e) }

    handleMouseMove(e) { functions.handleMouseMove(this, e) }

    handleMouseDown(e) { functions.handleMouseDown(this, e) }

    handleWheel(e) { functions.handleWheel(this, e) }

    handleMouseUp() {
        this.setState({ clicked: false })
    }

    draw() {
        if (this.props.app.state.currentLocale !== null) {
            draw(this.canvasRef.current, window.innerWidth - 4, window.innerHeight - 4, this.props.app, this.state.x, this.state.y, this.state.zoom, this.state.mouseX, this.state.mouseY, this.state.hoverEntity)
        }
        this.setState({ animationFrame: requestAnimationFrame(this.draw.bind(this)) })
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                className="map-canvas"
                width={window.innerWidth - 4}
                height={window.innerHeight - 4}
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseMove={this.handleMouseMove.bind(this)}
                onMouseUp={this.handleMouseUp.bind(this)}
                onWheel={this.handleWheel.bind(this)}
            />
        )
    }
}

