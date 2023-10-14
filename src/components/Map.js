import React, { Component } from 'react';
import Button from './Button';
import "./Map.css";

export default class Map extends Component {

    handleEditClick() {
        let response = prompt("Please enter the URL of an image for this map.", "");
        if (response !== null) {
            this.props.entity.set("mapSrc", response);
        }
    }

    handleGoToClick() {
        this.props.entity.game.app.set("currentLocale", this.props.entity);
    }

    render() {
        return (
            <Button hoverable={false} style={{ paddingTop: 0 }}>
                <header className="map-header">
                    <div className="map-header-title">Map</div>
                    <img className="map-button hoverable" alt="" src="./assets/edit.png" onClick={this.handleEditClick.bind(this)} />
                    <img className="map-button hoverable" alt="" src="./assets/goto.png" onClick={this.handleGoToClick.bind(this)} />
                </header>
                <img alt="Map" className="map-img" src={this.props.entity.fields.mapSrc} />
            </Button>
        )
    }
}
