import React, { Component } from 'react';
import Center from '../components/Center';
import "./Register.css";

export default class Register extends Component {
    render() {
        return (
            <div className="register-container" onClick={(e) => { e.stopPropagation() }}>
                <header><img alt="back" src="./assets/back.png" onClick={() => { this.props.app.set('currentModal', 'selectOnline') }} />
                    <div>
                        <Center>Register</Center>
                    </div>
                </header>
                <main>
                    <input type="text" placeholder="Username" value={this.props.app.state.modals.register.logInName}
                        onChange={(e) => { this.props.app.setModalValue('register', 'logInName', e.target.value) }} />
                    <br />
                    <input type="password" placeholder="Password" value={this.props.app.state.modals.register.password}
                        onChange={(e) => { this.props.app.setModalValue('register', 'password', e.target.value) }} />
                    <br />
                    <input type="password" placeholder="Verify Password" value={this.props.app.state.modals.register.verifyPassword}
                        onChange={(e) => { this.props.app.setModalValue('register', 'verifyPassword', e.target.value) }} />
                    <br />
                    <br />
                    <button onClick={() => {
                        this.props.app.register();
                    }}>Create an Account</button>
                    <br />
                    <br />
                    <button onClick={() => {
                        this.props.app.set('currentModal', 'logIn');
                    }}>I already have an Account!</button>
                </main >
            </div >
        )
    }
}
