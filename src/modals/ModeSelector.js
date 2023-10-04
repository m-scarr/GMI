import React, { Component } from 'react';
import Center from '../components/Center';
import "./ModeSelector.css";

export default class ModeSelector extends Component {
    render() {
        return (
            <div className="mode-selector-container" onClick={(e) => { e.stopPropagation() }} >
                <img alt="Nack" src="./assets/back.png" className="hoverable mode-selector-back" onClick={()=>{this.props.app.set("currentModal", "selectOnline")}}/>
                <img alt="Log Out" src="./assets/logout.png" className="hoverable mode-selector-log-out" onClick={()=>{this.props.app.logOut()}}/>
                <div className="hoverable mode-selector-option" style={{ borderTopRightRadius: 16, borderTopLeftRadius: 16 }} onClick={() => {
                    this.props.app.set('mode', 'gm')
                    this.props.app.set('currentModal', 'selectGame')
                }}>
                    <Center>
                        Game Master's Interface
                    </Center>
                </div>
                <hr />
                <div className="hoverable mode-selector-option" style={{ borderBottomRightRadius: 16, borderBottomLeftRadius: 16 }} onClick={() => {
                    this.props.app.set('mode', 'p')
                    //props.appState.set('currentModal', 'selectPlayerCharacter')
                }}>
                    <Center>
                        Player's Interface
                    </Center>
                </div>
            </div>
        )
    }
}
