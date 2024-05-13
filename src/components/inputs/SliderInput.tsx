import { useEffect, useRef, useState } from 'react'
import NumberInput from './NumberInput'
import AppState from '../../state/AppState';
import { observer } from 'mobx-react-lite';

type Props = { value: number, placeholder?: string, onInput: (val: number) => void, onIdle?: (val: number) => void, idleLength?: number, locking?: boolean, fontSize?: number, locked?: boolean, onLock?: (val: boolean) => void, min?: number, max?: number };

function SliderInput(props: Props) {
    const [locked, setLocked] = useState(props.locked || props.locking);
    const idleCountdown = useRef<number>(0);

    useEffect(() => {
        if (idleCountdown.current > 0) {
            idleCountdown.current -= 16;
            if (idleCountdown.current < 1 && props.onIdle) {
                props.onIdle(props.value)
            }
        }
    }, [AppState.instance.tick])

    useEffect(() => {
    }, [])

    const handleInputChange = (e: any) => {
        props.onInput!(e.target.value);
        idleCountdown.current = props.idleLength || 1000;
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
            <div style={{width: 120}}>
            <NumberInput {...props} onLock={(locked: boolean) => { setLocked(locked) }}/>
            </div>
        </div>
    )
}

export default observer(SliderInput);