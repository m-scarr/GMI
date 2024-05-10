import React from 'react'
import { refData } from '../state/types'
import AppState from '../state/AppState'
import { observer } from 'mobx-react-lite'

type Props = {}

function MenuHeader({ }: Props) {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: AppState.instance.currentCategory === null ? "dimgray" : (refData as any)[AppState.instance.currentCategory].color as string
            }} >{AppState.instance.currentCategory === null ? "Options" : (refData as any)[AppState.instance.currentCategory].plural}</div>
            <div style={{ display: "flex", flexDirection: "row", borderBottom: AppState.instance.currentCategory === null ? "2px solid white" : "" }}>
                <div key={"key-Option"} style={{ backgroundColor: "dimgray", height: 36, paddingTop: 2 }} onClick={() => { AppState.instance.currentCategory = null; }}>
                    <img src="./assets/options.png" />
                </div>
                {Object.keys(refData).map((category: any) => {
                    return (
                        <div key={"key-" + category} style={{ backgroundColor: (refData as any)[category].color, height: 36, paddingTop: 2 }} onClick={() => { AppState.instance.currentCategory = category; }}>
                            <img src={(refData as any)[category].defaultMarkerSrc} />
                        </div>
                    )
                })}</div>
        </div>
    )
}

export default observer(MenuHeader);