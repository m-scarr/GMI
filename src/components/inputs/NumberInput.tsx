import { useEffect, useRef, useState } from 'react'
import AppState from '../../state/AppState';
import { observer } from 'mobx-react-lite';

type Props = { color?: string, value: number, placeholder?: string, onInput: (val: number) => void, onIdle?: (val: number) => void, idleLength?: number, locking?: boolean, fontSize?: number, locked?: boolean, onLock?: (val: boolean) => void, min?: number, max?: number }

function NumberInput(props: Props) {
    const [value, setValue] = useState<number>(props.value);
    const [locked, setLocked] = useState(props.locking || false);
    const [lineHeight, setLineHeight] = useState(0);
    const inputRef = useRef<any>(null);
    const idleCountdown = useRef<number>(0);

    useEffect(() => {
        if (idleCountdown.current > 0) {
            idleCountdown.current -= 16;
            if (idleCountdown.current < 1 && props.onIdle) {
                props.onIdle(inputRef.current.value)
            }
        }
    }, [AppState.instance.tick])

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);


    useEffect(() => {
        setLineHeight(parseInt(window.getComputedStyle(inputRef.current).fontSize));
    }, [inputRef])


    const handleInputChange = (e: any) => {
        props.onInput!(Math.max(props.min || 0, Math.min(e.target.value, props.max || 100)));
        idleCountdown.current = props.idleLength || 1000;
    }

    return (
        <div style={{ display: "flex" }}>
            <input
                type="number"
                ref={inputRef}
                value={Math.max(props.min || 0, Math.min(value, props.max || 100))}
                onChange={handleInputChange}
                disabled={locked || props.locked}
                min={props.min || 0}
                max={props.max || 100}
                style={{
                    borderWidth: 3,
                    borderStyle: "solid",
                    overflow: "hidden",
                    resize: "none",
                    padding: 2,
                    paddingRight: (props.locking || props.locked ? Math.max(lineHeight, 16) / 2 + 8 : 2),
                    fontSize: props.fontSize || 16,
                    width: `calc(100% - ${props.locking || props.locked ? Math.max(lineHeight, 16) / 2 + 8 : 2}px)`,
                    height: (props.fontSize || 16) + 4,
                    textAlign: "center",
                    textShadow: `1px 1px 1px black, -1px -1px 1px black, -1px 1px 1px black, 1px -1px 1px black, ` +
                        `1px 1px 2px ${props.color ? props.color : 'white'}, -1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `-1px 1px 2px ${props.color ? props.color : 'white'}, 1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `1px 1px 2px ${props.color ? props.color : 'white'}, -1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `-1px 1px 2px ${props.color ? props.color : 'white'}, 1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `1px 1px 2px ${props.color ? props.color : 'white'}, -1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `-1px 1px 2px ${props.color ? props.color : 'white'}, 1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `1px 1px 2px ${props.color ? props.color : 'white'}, -1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `-1px 1px 2px ${props.color ? props.color : 'white'}, 1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `1px 1px 2px ${props.color ? props.color : 'white'}, -1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `-1px 1px 2px ${props.color ? props.color : 'white'}, 1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `1px 1px 2px ${props.color ? props.color : 'white'}, -1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `-1px 1px 2px ${props.color ? props.color : 'white'}, 1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `1px 1px 2px ${props.color ? props.color : 'white'}, -1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `-1px 1px 2px ${props.color ? props.color : 'white'}, 1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `1px 1px 2px ${props.color ? props.color : 'white'}, -1px -1px 2px ${props.color ? props.color : 'white'}, ` +
                        `-1px 1px 2px ${props.color ? props.color : 'white'}, 1px -1px 2px ${props.color ? props.color : 'white'}`,
                    borderColor: props.color ? props.color : "rgb(112, 112, 112)",
                }} />
            {props.locking || props.locked ?
                <div style={{
                    position: "relative",
                    width: 0,
                    height: 0,
                    right: Math.max(lineHeight, 16) / 2 + 7,
                    top: 6,
                }}>
                    <img style={{
                        height: Math.max(lineHeight, 16),
                        filter: "drop-shadow(0 0 1px rgba(255, 255, 255, .6)) drop-shadow(0 0 1px rgba(255, 255, 255, .6))",
                        position: "absolute"
                    }}
                        alt="lock/unlock" src={`./assets/${locked || props.locked ? '' : 'un'}locked.png`} onClick={() => {
                            if (props.onLock) {
                                props.onLock(!locked);
                            }
                            setLocked(!locked);
                        }} />
                </div>
                : null}
        </div>
    )
}

export default observer(NumberInput);