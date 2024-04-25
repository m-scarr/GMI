import { useEffect, useRef, useState } from 'react'
import NumberInput from './NumberInput'

type Props = { value: number, placeholder?: string, onInput: (val: number) => void, onIdle?: (val: number) => void, idleLength?: number, locking?: boolean, fontSize?: number, locked?: boolean, onLock?: (val: boolean) => void, min?: number, max?: number };

export default function SliderInput(props: Props) {
    const [idleCountDown, setIdleCountDown] = useState(false);
    const [locked, setLocked] = useState(props.locked || props.locking);
    const rendered = useRef<boolean>(false);
    const idleTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let startingTimeout: any = null;
        if (!rendered.current) {
            startingTimeout = setTimeout(() => {
                rendered.current = true;
                clearTimeout(startingTimeout);
                startingTimeout = null;
            }, 100);
        }
        return () => {
            if (idleTimeout.current !== null) {
                clearTimeout(idleTimeout.current!);
                idleTimeout.current = null;
            }
            if (startingTimeout !== null) {
                clearTimeout(startingTimeout);
                startingTimeout = null;
            }
        }
    }, [])

    useEffect(() => {
        if (idleCountDown) {
            if (typeof props !== "undefined" && typeof props.onIdle !== "undefined" && rendered.current) {
                if (idleTimeout.current !== null) {
                    clearTimeout(idleTimeout.current);
                    idleTimeout.current = null;
                }
                idleTimeout.current = setTimeout(() => {
                    props.onIdle!(Math.max(props.min || 0, Math.min(props.value, props.max || 100)));
                    clearTimeout(idleTimeout.current!);
                    idleTimeout.current = null;
                }, props.idleLength || 1000);
            }
            setIdleCountDown(false);
        }
    }, [idleCountDown]);

    const handleInputChange = (e: any) => {
        props.onInput!(e.target.value);
        if (!idleCountDown) {
            setIdleCountDown(true);
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <input
                disabled={locked}
                style={{ border: 0, padding: 0, marginLeft: 0, marginTop: 5, marginRight: 0, height: props.fontSize || 16 }}
                type="range"
                value={Math.max(props.min || 0, Math.min(props.value, props.max || 100))}
                onChange={handleInputChange}
            />
            <NumberInput {...props} onLock={(locked: boolean) => { setLocked(locked) }} />
        </div>
    )
}