import React, { useState } from 'react'
import API from '../API'
import AppState from '../state/AppState'
import { observer } from 'mobx-react-lite'

type Props = {}

function LogOut({ }: Props) {
    const [hover, setHover] = useState<boolean>(false);
    return AppState.instance.user === null ? null : (
        <img style={{
            zIndex: 10,
            imageRendering: "pixelated",
            position: "fixed",
            right: 0,
            top: 0,
            width: 64,
            height: 64,
            backgroundColor: hover ? "rgba(255, 255, 255, .5)" : "rgba(255, 255, 255, .25)",
            opacity: hover ? 1 : .5,
            padding: 2,
            borderBottomLeftRadius: 4
        }}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onMouseOut={() => {
                setHover(false);
            }}
            src="./assets/logout.png"
            onClick={() => { API.user.logOut() }} />
    )
}

export default observer(LogOut);