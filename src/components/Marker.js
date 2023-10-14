import React, { Component } from 'react';
import Button from "./Button";
import "./Marker.css";
import { mapInstance } from '../map';

export default class Marker extends Component {

    handleEditClick() {
        let response = prompt("Please enter the URL of an image for this marker.", "");
        if (response !== null) {
            this.props.entity.set("markerSrc", response);
        }
    }

    handlePinClick() {
        this.props.entity.game.app.set("droppingMarker", this.props.entity);
    }

    handleGoToClick() {
        mapInstance.goToEntity(this.props.entity);
    }

    handleVisibleClick() {
        this.props.entity.set("visible", !this.props.entity.fields.visible);
    }

    render() {
        return (
            <Button hoverable={false} style={{ paddingTop: 0 }}>
                <header className="marker-header">
                    <div className="marker-header-title">Marker</div>
                    <img className="marker-button hoverable" alt="" src="./assets/edit.png" onClick={this.handleEditClick.bind(this)} />
                    <img className="marker-button hoverable" alt="" src="./assets/pin.png" onClick={this.handlePinClick.bind(this)} />
                    <img className="marker-button hoverable" alt="" src={this.props.entity.fields.visible ? "./assets/visible.png" : "./assets/invisible.png"} onClick={this.handleVisibleClick.bind(this)} />
                    <img className="marker-button hoverable" alt="" src="./assets/goto.png" onClick={this.handleGoToClick.bind(this)} />
                </header>
                <img alt="Marker" className="marker-img" src={this.props.entity.fields.markerSrc} />
            </Button>
        )
    }
}
