import React, { Component } from 'react';
import Center from '../components/Center';
import "./LogIn.css";

export default class LogIn extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <div className="log-in-container" onClick={(e) => { e.stopPropagation() }}>
                <header><img alt="back" src="./assets/back.png"
                    onClick={() => { this.props.app.set('currentModal', 'selectOnline') }} />
                    <div>
                        <Center>Log In</Center>
                    </div>
                </header>
                <main>
                    <input type="text" placeholder="Username" value={this.props.app.state.modals.logIn.logInName}
                        onChange={(e) => { this.props.app.setModalValue('logIn', 'logInName', e.target.value) }} /><br />
                    <input type="password" placeholder="Password" value={this.props.app.state.modals.logIn.password}
                        onChange={(e) => { this.props.app.setModalValue('logIn', 'password', e.target.value) }} />
                    <br />
                    <br />
                    <button onClick={() => {
                        this.props.app.logIn();
                    }}>Log In</button>
                    <br />
                    <br />
                    <button onClick={() => {
                        this.props.app.set('currentModal', 'register');
                    }}>Create an Account</button>
                </main >
            </div >
        )
    }
}
