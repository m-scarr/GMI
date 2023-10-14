import React, { Component } from 'react'
import Center from '../../components/Center';
import "./style.css"
import Button from '../../components/Button';
export let buttonInstance

export class EntityButton extends Component {

  constructor(props) {
    super(props);
    buttonInstance = this;
  }

  handleVisibleClick() {
    this.props.entity.set("visible", !this.props.entity.fields.visible);
  }

  render() {
    return (
      <Button style={{ display: "flex", padding: 0 }} hoverable={false}>
        <div className="hoverable entity-button-name-container" onClick={() => { this.props.entity.game.app.set('currentEntity', this.props.entity) }}>
          {this.props.entity.fields.name}
        </div>
        {(this.props.entity.category !== "nativeItems" && !(this.props.entity.category === "locales" && this.props.entity === this.props.entity.game.overworldLocale)) ?
          <div className="hoverable entity-button-visible-container">
            <Center><img alt="visibility toggle" src={(this.props.entity.fields.visible ? "./assets/visible.png" : "./assets/invisible.png")} onClick={this.handleVisibleClick.bind(this)} /></Center>
          </div> : null}
      </Button>
    )
  }
}
