import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import AppState from '../../state/AppState';
import { ModalType } from '../../state/types';
import API from '../../API';

type Props = {};

function RegisterModal({ }: Props) {
    const [logInName, setLogInName] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [usernameFeedBack, setUsernameFeedBack] = useState<string[]>([]);
    const [passwordFeedBack, setPasswordFeedBack] = useState<string[]>([]);
    const handleRegisterClick = async () => {
        const newUsernameFeedBack = []
        const newPasswordFeedBack = []
        if (logInName.length < 6) {
            newUsernameFeedBack.push("Your username must be atleast 6 characters.");
        }
        if (logInName.length > 255) {
            newUsernameFeedBack.push("Your username must be 255 or fewer characters.");
        }
        if (logInName.includes(" ")) {
            newUsernameFeedBack.push("Your username can not contain a space.");
        }
        if (password !== verifyPassword) {
            newPasswordFeedBack.push("Your passwords don't match.");
        }
        if (password.length < 6) {
            newPasswordFeedBack.push("Your password must be atleast 6 characters.");
        }
        if (password.length > 72) {
            newPasswordFeedBack.push("Your password must be 72 or fewer characters.");
        }
        if (password.includes(" ")) {
            newPasswordFeedBack.push("Your password can not contain a space.");
        }
        setUsernameFeedBack(newUsernameFeedBack);
        setPasswordFeedBack(newPasswordFeedBack);
        if (newUsernameFeedBack.length === 0 && newPasswordFeedBack.length === 0) {
            const result = await API.user.register(logInName, password);
            if (result) {
                alert("Register was successful!")
            } else {
                setUsernameFeedBack([...usernameFeedBack, "This username was not available."]);
            }
        }
    }
    const handleLogInClick = () => {
        AppState.instance.currentModal = ModalType.LogIn;
    }
    return (
        <div className="modal" style={{ display: "flex", flexDirection: "column", width: 360 }} onClick={(e: any) => {
            e.stopPropagation();
        }}>
            Register
            <hr />
            <form style={{ display: "flex", flexDirection: "column" }} >
                <input value={logInName} placeholder="Username" onInput={(e: any) => { setLogInName(e.target.value) }} />
            </form>
            {
                usernameFeedBack.map((feedback: string) => {
                    return <div key={feedback} style={{ fontSize: 24 }}>{feedback}</div>
                })
            }
            <input type="password" value={password} placeholder="Password" onInput={(e: any) => { setPassword(e.target.value) }} />
            <input type="password" value={verifyPassword} placeholder="Verify Password" onInput={(e: any) => { setVerifyPassword(e.target.value) }} />
            {
                passwordFeedBack.map((feedback: string) => {
                    return <div key={feedback} style={{ fontSize: 24 }}>{feedback}</div>
                })
            }
            <button onClick={handleRegisterClick}>Create Account</button>
            <button onClick={handleLogInClick}>I already have an Account</button>
        </div>
    )
}

export default observer(RegisterModal);