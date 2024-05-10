import { useEffect, useRef, useState } from 'react'

type Props = { value: string, placeholder?: string, onInput: (val: string) => void, onIdle?: (val: string) => void, idleLength?: number, locking?: boolean, fontSize?: number, locked?: boolean, onLock?: (val: boolean) => void }

export default function TextInput(props: Props) {
    const [value, setValue] = useState<string>(props.value);
    const [locked, setLocked] = useState(props.locking || false);
    const [lineHeight, setLineHeight] = useState(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const [idleCountDown, setIdleCountDown] = useState(false);
    const [cursor, setCursor] = useState(null);
    const rendered = useRef<boolean>(false);
    const inputRef = useRef<any>(null);
    const idleTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (idleTimeout.current !== null) {
                clearTimeout(idleTimeout.current!);
                idleTimeout.current = null;
            }
        }
    }, [])

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    useEffect(() => {
        let startingTimeout: any = null;
        if (!rendered.current) {
            startingTimeout = setTimeout(() => {
                rendered.current = true;
                clearTimeout(startingTimeout);
                startingTimeout = null;
            }, 100);
        }
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
        return () => {
            if (startingTimeout !== null) {
                clearTimeout(startingTimeout);
                startingTimeout = null;
            }
        }
    }, [value])

    useEffect(() => {
        setTotalHeight(inputRef.current.clientHeight);
        setLineHeight(parseInt(window.getComputedStyle(inputRef.current).fontSize));
    }, [inputRef])

    useEffect(() => {
        if (idleCountDown) {
            if (typeof props !== "undefined" && typeof props.onIdle !== "undefined" && rendered.current) {
                if (idleTimeout.current !== null) {
                    clearTimeout(idleTimeout.current);
                    idleTimeout.current = null;
                }
                idleTimeout.current = setTimeout(() => {
                    props.onIdle!(value);
                    clearTimeout(idleTimeout.current!);
                    idleTimeout.current = null;
                }, props.idleLength || 1000);
            }
            setIdleCountDown(false);
        }
    }, [idleCountDown]);

    useEffect(() => {
        const input = inputRef.current;
        if (input) {
            input.setSelectionRange(cursor, cursor);
        }
    }, [inputRef, cursor, value])

    const handleInputChange = (e: any) => {
        setCursor(e.target.selectionStart);
        props.onInput!(e.target.value);
        setIdleCountDown(true);
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
                    minHeight: props.fontSize || 16,
                    textAlign: "center"
                }}>
            </textarea>
            {props.locking || props.locked ?
                <div style={{
                    position: "relative",
                    width: 0,
                    height: 0,
                    right: Math.max(lineHeight, 16) / 2 + 7,
                    top: totalHeight / 2 - Math.max(lineHeight, 16) / 2
                }}>
                    <img style={{ height: Math.max(lineHeight, 16) }}
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