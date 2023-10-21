import React, { Component } from 'react';
import Button from "./Button";
import "./Marker.css";
import { mapInstance } from '../map';

export default class Marker extends Component {

    state = { visibilityCanChange: false, locationCanChange: false, canGoTo: false }

    componentDidMount() {
        this.setState({
            visibilityCanChange: (typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique) &&
                (typeof this.props.entity.groupMembers === "undefined" || this.props.entity.groupMembers.length === 0),
            locationCanChange: (typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique) &&
                (typeof this.props.entity.groupMembers === "undefined" || this.props.entity.groupMembers.length === 0),
            canGoTo: (typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.entity.fields !== this.props.entity.fields) {
            this.setState({
                visibilityCanChange: (typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique) &&
                    (typeof this.props.entity.groupMembers === "undefined" || this.props.entity.groupMembers.length === 0),
                locationCanChange: (typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique) &&
                    (typeof this.props.entity.groupMembers === "undefined" || this.props.entity.groupMembers.length === 0),
                canGoTo: (typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique)
            })
        }
    }

    handleEditClick() {
        let response = prompt("Please enter the URL of an image for this marker.", "");
        if (response !== null) {
            this.props.entity.set("markerSrc", response);
        }
    }

    handlePinClick() {
        if ((typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique) &&
            (typeof this.props.entity.groupMembers === "undefined" || this.props.entity.groupMembers.length === 0 || this.props.entity.category === "groups")) {
            this.props.entity.game.app.set("droppingMarker", this.props.entity);
        }
    }

    handleGoToClick() {
        if ((typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique)) {
            mapInstance.goToEntity(this.props.entity);
        }
    }

    handleVisibleClick() {
        if ((typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique) &&
            (typeof this.props.entity.groupMembers === "undefined" || this.props.entity.groupMembers.length === 0 || this.props.entity.category === "groups")) {
            this.props.entity.set("visible", !this.props.entity.fields.visible);
        }
    }

    render() {
        return (
            <Button hoverable={false} style={{ paddingTop: 0 }}>
                <header className="marker-header">
                    <div className="marker-header-title">Marker</div>
                    <img className="marker-button hoverable"
                        alt=""
                        src="./assets/edit.png"
                        onClick={this.handleEditClick.bind(this)} />
                    <img className={"marker-button" + (((typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique) &&
                        (typeof this.props.entity.groupMembers === "undefined" || this.props.entity.groupMembers.length === 0 || this.props.entity.category === "groups")) ? " hoverable" : " disabled")}
                        alt=""
                        src="./assets/pin.png"
                        onClick={this.handlePinClick.bind(this)} />
                    <img className={"marker-button" + (((typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique) &&
                        (typeof this.props.entity.groupMembers === "undefined" || this.props.entity.groupMembers.length === 0 || this.props.entity.category === "groups")) ? " hoverable" : " disabled")}
                        alt=""
                        src={this.props.entity.fields.visible ? "./assets/visible.png" : "./assets/invisible.png"}
                        onClick={this.handleVisibleClick.bind(this)} />
                    <img className={"marker-button" + (((typeof this.props.entity.fields.unique === "undefined" || this.props.entity.fields.unique)) ? " hoverable" : " disabled")}
                        alt="" src="./assets/goto.png"
                        onClick={this.handleGoToClick.bind(this)} />
                </header>
                <img alt="Marker" className="marker-img" src={this.props.entity.fields.markerSrc} />
            </Button>
        )
    }
}
