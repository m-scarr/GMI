import { Component } from 'react';
import "./index.css";
import OnlineSelector from './OnlineSelector';
import Center from '../components/Center';
import LogIn from './LogIn';
import Register from './Register';
import GameSelector from './GameSelector';
import ModeSelector from './ModeSelector';

export default class Modals extends Component {
    //need to add item modal
    //need to add icon selector modal
    //need to add battlefield modal
    render() {
        return this.props.app.state.currentModal === null ? null :
            <div className="modals-full-screen" onClick={() => {
                if (this.props.app.state.currentModal === 'iconSelector' || this.props.app.state.currentModal === 'battlefield') {
                    this.props.app.set('currentModal', null);
                }
            }}>
                <Center>
                    {this.props.app.state.currentModal === "selectOnline" ? <OnlineSelector app={this.props.app} /> : null}
                    {this.props.app.state.currentModal === "logIn" ? <LogIn app={this.props.app} /> : null}
                    {this.props.app.state.currentModal === "register" ? <Register app={this.props.app} /> : null}
                    {this.props.app.state.currentModal === "selectMode" ? <ModeSelector app={this.props.app} /> : null}
                    {this.props.app.state.currentModal === "selectGame" ? <GameSelector app={this.props.app} /> : null}
                </Center>
            </div >
    }
}