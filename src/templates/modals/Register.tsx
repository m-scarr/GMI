import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import AppState from '../../state/AppState';
import { ModalType } from '../../state/types';
import API from '../../API';

type Props = {};

function RegisterModal({ }: Props) {
    const [logInName, setLogInName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const handleRegisterClick = () => {
        API.user.register(logInName, displayName, email, password);
    }
    const handleLogInClick = () => {
        AppState.instance.currentModal = ModalType.LogIn;
    }
    return (
        <div className="modal" style={{display: "flex", flexDirection: "column"}}>
            Register
            <hr />
            <input value={logInName} placeholder="This is the username you will log in with" onInput={(e:any)=>{setLogInName(e.target.value)}} />
            <input value={displayName} placeholder="This is the username others will see you as" onInput={(e:any)=>{setDisplayName(e.target.value)}} />
            <input value={email} placeholder="E-mail" onInput={(e:any)=>{setEmail(e.target.value)}} />
            <input value={password} placeholder="Password" onInput={(e:any)=>{setPassword(e.target.value)}} />
            <input value={verifyPassword} placeholder="Verify Password" onInput={(e:any)=>{setVerifyPassword(e.target.value)}} />
            <button onClick={handleRegisterClick}>Create Account</button>
            <button onClick={handleLogInClick}>I already have an Account</button>
        </div>
    )
}

export default observer(RegisterModal);