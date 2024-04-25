import { useEffect, useRef, useState } from 'react'

type Props = { value: number, placeholder?: string, onInput: (val: number) => void, onIdle?: (val: number) => void, idleLength?: number, locking?: boolean, fontSize?: number, locked?: boolean, onLock?: (val: boolean) => void, min?: number, max?: number }

export default function NumberInput(props: Props) {
    const [value, setValue] = useState<number>(props.value);
    const idleTimeout = useRef<NodeJS.Timeout | null>(null);
    const [locked, setLocked] = useState(props.locking || false);
    const [lineHeight, setLineHeight] = useState(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const [idleCountDown, setIdleCountDown] = useState(false);
    const rendered = useRef<boolean>(false);
    const inputRef = useRef<any>(null);

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
                    props.onIdle!(Math.max(props.min || 0, Math.min(value, props.max || 100)));
                    clearTimeout(idleTimeout.current!);
                    idleTimeout.current = null;
                }, props.idleLength || 1000);
            }
            setIdleCountDown(false);
        }
    }, [idleCountDown]);

    const handleInputChange = (e: any) => {
        props.onInput!(Math.max(props.min || 0, Math.min(e.target.value, props.max || 100)));
        setIdleCountDown(true);
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
                    paddingRight: props.locking || props.locked ? Math.max(lineHeight, 16) / 2 + 16 : 2,
                    paddingTop: 5,
                    paddingBottom: 4,
                    fontSize: props.fontSize || 16,
                    width: `calc(100% - ${props.locking || props.locked ? Math.max(lineHeight, 16) / 2 + 24 : 2}px)`,
                    minHeight: props.fontSize || 16,
                    textAlign: "center"
                }} />
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