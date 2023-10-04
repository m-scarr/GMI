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

  render() {
    return (
      <Button style={{ display: "flex", padding: 0 }} hoverable={false}>
        <div className="hoverable entity-button-name-container" onClick={() => { this.props.entity.game.app.set('currentEntity', this.props.entity) }}>
          {this.props.entity.fields.name}
        </div>
        {this.props.entity.category !== "nativeItems" ?
          <div className="hoverable entity-button-visible-container">
            <Center><img alt="visibility toggle" src="./assets/visible.png" /></Center>
          </div> : null}
      </Button>
    )
  }
}
