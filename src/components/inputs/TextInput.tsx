import { useEffect, useRef, useState } from 'react'
import AppState, { wait } from '../../state/AppState';
import { observer } from 'mobx-react-lite';
import InputManager from '../../state/InputManager';

type Props = {
    color?: string,
    value: string,
    placeholder?: string,
    onInput: (val: string) => void,
    onIdle?: (val: string) => void,
    idleLength?: number,
    locking?: boolean,
    fontSize?: number,
    locked?: boolean,
    onLock?: (val: boolean) => void,
    minRows?: number
}

function TextInput(props: Props) {
    const [timerId, setTimerId] = useState<string | null>(null);
    const [value, setValue] = useState<string>(props.value);
    const [locked, setLocked] = useState(props.locking || false);
    const [lineHeight, setLineHeight] = useState(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const [cursor, setCursor] = useState(null);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        wait(10).then(() => {
            const textArea = inputRef.current;
            if (textArea) {
                textArea.style.height = "16px";
                while (
                    textArea.scrollHeight &&
                    textArea.clientHeight &&
                    textArea.scrollHeight > textArea.clientHeight
                ) {
                    textArea.style.height = parseInt(textArea.style.height.split("px")[0]) + 1 + "px";
                }
                setTotalHeight(textArea.clientHeight);
            }
        });
    }, []);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    useEffect(() => {
        const textArea = inputRef.current;
        if (textArea) {
            textArea.style.height = "16px";
            while (
                textArea.scrollHeight &&
                textArea.clientHeight &&
                textArea.scrollHeight > textArea.clientHeight
            ) {
                textArea.style.height = parseInt(textArea.style.height.split("px")[0]) + 1 + "px";
            }
        }
        setTotalHeight(inputRef.current.clientHeight);
    }, [value])

    useEffect(() => {
        setTotalHeight(inputRef.current.clientHeight);
        setLineHeight(parseInt(window.getComputedStyle(inputRef.current).fontSize));
    }, [inputRef])

    useEffect(() => {
        const input = inputRef.current;
        if (input) {
            input.setSelectionRange(cursor, cursor);
        }
    }, [inputRef, cursor, value])

    const handleInputChange = (e: any) => {
        setCursor(e.target.selectionStart);
        props.onInput!(e.target.value);
        if (props.onIdle) {
            if (timerId === null) {
                setTimerId(InputManager.createTimer(props.idleLength || 1000, e.target.value, (val: string) => {
                    setTimerId(null);
                    props.onIdle!(val);
                }));
            } else {
                InputManager.setTimer(timerId, props.idleLength || 1000, e.target.value);
            }
        }
    }

    return (
        <div style={{ display: "flex" }}>
            <textarea
                ref={inputRef}
                value={value}
                onChange={handleInputChange}
                disabled={locked || props.locked}
                placeholder={props.placeholder}
                style={{
                    borderWidth: 3,
                    borderStyle: "solid",
                    overflow: "hidden",
                    resize: "none",
                    padding: 2,
                    paddingRight: props.locking || props.locked ? Math.max(lineHeight, 16) / 2 + 16 : 2,
                    fontSize: props.fontSize || 16,
                    width: `calc(100% - ${props.locking || props.locked ? Math.max(lineHeight, 16) / 2 + 24 : 2}px)`,
                    minHeight: props.minRows ? props.minRows * (props.fontSize || 16) : (props.fontSize || 16),
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
                }}>
            </textarea>
            {
                props.locking || props.locked ?
                    <div style={{
                        position: "relative",
                        width: 0,
                        height: 0,
                        right: Math.max(lineHeight, 16) / 2 + 7,
                        top: totalHeight / 2 - Math.max(lineHeight, 16) / 2,
                    }}>
                        <img style={{ height: Math.max(lineHeight, 16), filter: "drop-shadow(0 0 1px rgba(255, 255, 255, .6)) drop-shadow(0 0 1px rgba(255, 255, 255, .6))", transform: "translateY(2px)" }}
                            alt="lock/unlock" src={`./assets/${locked || props.locked ? '' : 'un'}locked.png`} onClick={() => {
                                if (props.onLock) {
                                    props.onLock(!locked);
                                }
                                setLocked(!locked);
                            }} />
                    </div>
                    : null
            }
        </div >
    )
}

export default observer(TextInput);