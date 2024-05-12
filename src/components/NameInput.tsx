import React, { useEffect, useState } from 'react'
import TextInput from './inputs/TextInput'
import { observer } from 'mobx-react-lite';
import AppState from '../state/AppState';
import { refData } from '../state/types';

type Props = {}

const NameInput = (_props: Props) => {
    const [name, setName] = useState(AppState.instance.currentEntity!.name)
    return AppState.instance.currentCategory === null ? null : (
        <div style={{ backgroundColor: (refData as any)[AppState.instance.currentCategory].color, display: "flex", flexDirection: "row" }}>
            <div style={{ padding: 1, alignSelf: "stretch", alignContent:"center" }} onClick={() => { AppState.instance.currentEntity = null }} >
                <img src="./assets/back.png" />
            </div>
            <div style={{ width: "100%", padding: 1 }}>
                <TextInput
                    locking={true}
                    onLock={(locked: boolean) => {
                        if (locked) {
                            AppState.instance.currentEntity!.name = name;
                        }
                    }}
                    color={(refData as any)[AppState.instance.currentCategory].color}
                    placeholder={`Name`}
                    value={name}
                    onInput={setName}
                    fontSize={28} />
            </div>
        </div>
    )
}

export default observer(NameInput);