import { useEffect, useRef, useState } from 'react'
import NumberInput from './NumberInput'
import AppState from '../../state/AppState';
import { observer } from 'mobx-react-lite';
import InputManager from '../../state/InputManager';

type Props = { value: number, placeholder?: string, onInput: (val: number) => void, onIdle?: (val: number) => void, idleLength?: number, locking?: boolean, fontSize?: number, locked?: boolean, onLock?: (val: boolean) => void, min?: number, max?: number };

function SliderInput(props: Props) {
    const [timerId, setTimerId] = useState<string | null>(null);
    const [locked, setLocked] = useState(props.locked || props.locking);

    const handleInputChange = (e: any) => {
        props.onInput!(e.target.value);
        if (props.onIdle) {
            if (timerId === null) {
                setTimerId(InputManager.createTimer(props.idleLength || 1000, e.target.value, (val: number) => {
                    setTimerId(null);
                    props.onIdle!(val);
                }));
            } else {
                InputManager.setTimer(timerId, props.idleLength || 1000, e.target.value);
            }
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <input
                disabled={locked}
                style={{ border: 0, padding: 0, marginLeft: 0, marginTop: 7, marginRight: 0, height: props.fontSize || 16 }}
                type="range"
                value={Math.max(props.min || 0, Math.min(props.value, props.max || 100))}
                min={props.min || 0}
                max={props.max || 100}
                onChange={handleInputChange}
            />
            <div style={{ width: 120 }}>
                <NumberInput {...props} onLock={(locked: boolean) => { setLocked(locked) }} />
            </div>
        </div>
    )
}

export default observer(SliderInput);