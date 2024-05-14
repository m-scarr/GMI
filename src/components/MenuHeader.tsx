import { useState } from 'react'
import { Category, refData } from '../state/types'
import AppState from '../state/AppState'
import { observer } from 'mobx-react-lite'

type Props = {}

function MenuHeader({ }: Props) {
    const [hoverOptions, setHoverOptions] = useState(false);
    const hover = {
        [Category.Hero]: useState(false),
        [Category.NPC]: useState(false),
        [Category.Enemy]: useState(false),
        [Category.Group]: useState(false),
        [Category.NativeItem]: useState(false),
        [Category.Cache]: useState(false),
        [Category.Battlefield]: useState(false),
        [Category.Locale]: useState(false),
        [Category.Event]: useState(false)
    };
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                backgroundColor: AppState.instance.currentCategory === null ? "dimgray" : (refData as any)[AppState.instance.currentCategory].color as string
            }} >{AppState.instance.currentCategory === null ? "Options" : (refData as any)[AppState.instance.currentCategory].plural}</div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div key={"key-Option"} style={{ backgroundColor: "dimgray" }}>
                    <div
                        style={{ backgroundColor: `rgb(255, 255, 255, ${hoverOptions ? ".3" : "0"})`, height: 36, paddingTop: 2 }}
                        onClick={() => { AppState.instance.currentCategory = null; }}
                        onMouseEnter={() => {
                            setHoverOptions(true);
                        }}
                        onMouseLeave={() => {
                            setHoverOptions(false);
                        }}
                        onMouseOut={() => {
                            setHoverOptions(false);
                        }}>
                        <img src="./assets/options.png" />
                    </div>
                </div>
                {Object.keys(refData).map((category: any) => {
                    return (
                        <div
                            key={"key-" + category}
                            style={{ backgroundColor: (refData as any)[category].color }}
                            onMouseEnter={() => {
                                (hover as any)[category][1](true);
                            }}
                            onMouseLeave={() => {
                                (hover as any)[category][1](false);
                            }}
                            onMouseOut={() => {
                                (hover as any)[category][1](false);
                            }}>
                            <div

                                style={{
                                    backgroundColor: `rgb(255, 255, 255, ${(hover as any)[category][0] ? category === Category.NativeItem ? ".9" : ".3" : "0"})`,
                                    height: 36,
                                    paddingTop: 2,
                                    width: 32
                                }}
                                onClick={() => { AppState.instance.currentCategory = category; }}
                                onMouseEnter={() => {
                                    (hover as any)[category][1](true);
                                }}
                                onMouseLeave={() => {
                                    (hover as any)[category][1](false);
                                }}
                                onMouseOut={() => {
                                    (hover as any)[category][1](false);
                                }}>
                                <img src={(refData as any)[category].defaultMarkerSrc}
                                    onMouseEnter={() => {
                                        (hover as any)[category][1](true);
                                    }}
                                    onMouseLeave={() => {
                                        (hover as any)[category][1](false);
                                    }}
                                    onMouseOut={() => {
                                        (hover as any)[category][1](false);
                                    }} />
                            </div>
                        </div>
                    )
                })}</div>
        </div>
    )
}

export default observer(MenuHeader);