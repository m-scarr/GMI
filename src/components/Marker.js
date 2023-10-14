import React, { Component } from 'react';
import Button from "./Button";
import "./Marker.css";

export default class Marker extends Component {

    handlePinClick() {
        this.props.entity.game.app.set("droppingMarker", this.props.entity);
    }

    render() {
        return (
            <Button hoverable={false} style={{ paddingTop: 0 }}>
                <header className="marker-header">
                    <div className="marker-header-title">Marker</div>
                    <img className="marker-button hoverable" alt="" src="./assets/edit.png" />
                    <img className="marker-button hoverable" alt="" src="./assets/pin.png" onClick={this.handlePinClick.bind(this)} />
                    <img className="marker-button hoverable" alt="" src="./assets/visible.png" />
                    <img className="marker-button hoverable" alt="" src="./assets/goto.png" />
                </header>
                <img alt="Marker" className="marker-img" src={this.props.entity.fields.markerSrc} />
            </Button>
        )
    }
}
