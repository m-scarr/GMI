import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import AppState from '../../state/AppState';
import { ModalType } from '../../state/types';
import API from '../../API';

type Props = {};

function LogInModal({ }: Props) {
    const [logInName, setLogInName] = useState("");
    const [password, setPassword] = useState("");
    const handleRegisterClick = () => {
        AppState.instance.currentModal = ModalType.Register;
    }
    const handleLogInClick = () => {
        AppState.instance.logIn(logInName, password);
    }
    return (
        <div className="modal" style={{ display: "flex", flexDirection: "column" }} onClick={(e: any) => {
            e.stopPropagation();
        }}>
            Log In
            <hr />
            <input value={logInName} placeholder="Username" onInput={(e: any) => { setLogInName(e.target.value) }} />
            <input value={password} placeholder="Password" onInput={(e: any) => { setPassword(e.target.value) }} />
            <button onClick={handleLogInClick}>Log In</button>
            <button onClick={handleRegisterClick}>I don't have an Account</button>
        </div>
    )
}

export default observer(LogInModal);