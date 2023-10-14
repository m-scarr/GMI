import React, { Component } from 'react';
import Center from '../components/Center';
import Game from '../entities/Game'
import "./OnlineSelector.css";

export default class OnlineSelector extends Component {
    render() {
        return (
            <div className="online-selector-container" onClick={(e) => { e.stopPropagation() }}>
                <div className="hoverable online-selector-option" style={{ borderTopRightRadius: 16, borderTopLeftRadius: 16 }} onClick={() => {
                    this.props.app.setState({ currentGame: new Game(this.props.app, true) });
                    this.props.app.set('currentModal', 'logIn')
                }}>
                    <Center>
                        Online
                    </Center>
                </div>
                <hr />
                <div className="hoverable online-selector-option" style={{ borderBottomRightRadius: 16, borderBottomLeftRadius: 16 }} onClick={() => {
                    new Game(this.props.app, false) ;
                    this.props.app.set('currentModal', null);
                }}>
                    <Center>
                        Offline
                    </Center>
                </div>
            </div >
        )
    }
}
