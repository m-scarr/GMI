import React, { Component } from 'react';
import "./style.css";
import functions from "./functions";
import draw from "./draw";

export let mapInstance;

export class Map extends Component {

    canvasRef = React.createRef();

    state = {
        timeout: null,
        width: window.innerWidth - 4,
        height: window.innerHeight - 4,
        x: 0,
        y: 0,
        zoom: 1,
        mouseX: 0,
        mouseY: 0,
        clickX: 0,
        clickY: 0,
        clicked: false,
        hoverEntity: null,
        animationFrame: null,
    }

    constructor(props) {
        super(props);
        mapInstance = this;
    }

    componentDidMount() {
        this.drawLoop();
        window.addEventListener('resize', () => {
            this.setState({ width: window.innerWidth - 4, height: window.innerHeight - 4, })
        })
    }

    handleMouseEnter(e) { functions.handleMouseEnter(this, e); }

    handleMouseMove(e) { functions.handleMouseMove(this, e); }

    handleMouseDown(e) { functions.handleMouseDown(this, e); }

    handleWheel(e) { functions.handleWheel(this, e); }

    handleMouseUp() { functions.handleMouseUp(this); }

    handleMouseOut() { functions.handleMouseOut(this); }

    drawLoop() {
        if (this.props.app.state.currentLocale !== null) {
            draw(this);
        }
        this.setState({ animationFrame: requestAnimationFrame(this.drawLoop.bind(this)) });
    }

    goToEntity(destination) {
        if (destination.fields.location.locale !== null) {
            functions.goToEntity(this, destination);
        }
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                className="map-canvas"
                width={this.state.width}
                height={this.state.height}
                onContextMenu={(e) => { e.preventDefault() }}
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseMove={this.handleMouseMove.bind(this)}
                onMouseUp={this.handleMouseUp.bind(this)}
                onWheel={this.handleWheel.bind(this)}
                onMouseOut={this.handleMouseOut.bind(this)}
            />
        )
    }
}

