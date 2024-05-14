import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import CheckButton from './inputs/CheckButton'
import AppState from '../state/AppState'

type Props = {}

function EquippableButton({ }: Props) {
    const [equippable, setEquippable] = useState<boolean>((AppState.instance.currentEntity as any).equippable);
    useEffect(() => {
        setEquippable((AppState.instance.currentEntity as any).equippable);
    }, [AppState.instance.currentEntity, (AppState.instance.currentEntity as any).equippable])
    return (
        <CheckButton value={equippable}
            onInput={(val: boolean) => {
                setEquippable(val);
                (AppState.instance.currentEntity as any).equippable = val;
            }}>Equippable</CheckButton>
    )
}

export default observer(EquippableButton)