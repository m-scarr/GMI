import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import TextInput from '../../components/inputs/TextInput';
import API from '../../API';
import AppState from '../../state/AppState';
import Hero from '../../state/Hero';

function UserSelectorModal() {
    const [search, setSearch] = useState<string>("");
    const [users, setUsers] = useState<{ logInName: string, id: number }[]>([]);
    return (
        <div className="modal" style={{ width: "30vw" }} onClick={(e: any) => {
            e.stopPropagation();
        }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "100%" }}>
                    <TextInput
                        value={search}
                        onInput={setSearch}
                        fontSize={32}
                        idleLength={1000}
                        onIdle={async (val: string) => {
                            if (val !== "") {
                                setUsers(await API.user.search(val));
                            }
                        }}
                        placeholder="Search Users..."
                    />
                </div>
            </div>
            <hr />
            <div style={{ height: "40vh", overflowY: "scroll" }}>
                <div key={'user-button-none'}>
                    <button key={'user-button-null'} onClick={() => {
                        (AppState.instance.currentEntity as Hero).playerUser = null;
                        AppState.instance.currentModal = null;
                    }}>
                        No User
                    </button>
                </div>
                {users.map((user: { logInName: string, id: number }) => {
                    return (
                        <div key={'user-button-' + user.id}>
                            <button key={'user-button-' + user.id} onClick={() => {
                                (AppState.instance.currentEntity as Hero).playerUser = user;
                                AppState.instance.currentModal = null;
                            }}>
                                {user.logInName}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default observer(UserSelectorModal);