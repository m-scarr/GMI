import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import CheckButton from './inputs/CheckButton'
import AppState from '../state/AppState'

type Props = {}

function UniqueButton({ }: Props) {
    const [unique, setUnique] = useState<boolean>((AppState.instance.currentEntity as any).unique);
    useEffect(() => {
        setUnique((AppState.instance.currentEntity as any).unique);
    }, [AppState.instance.currentEntity, (AppState.instance.currentEntity as any).unique])
    return (
        <CheckButton value={unique}
            onInput={(val: boolean) => {
                setUnique(val);
                (AppState.instance.currentEntity as any).unique = val;
            }}>Unique</CheckButton>
    )
}

export default observer(UniqueButton)