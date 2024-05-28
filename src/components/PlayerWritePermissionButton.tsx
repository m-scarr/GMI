import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import CheckButton from './inputs/CheckButton'
import AppState from '../state/AppState'
import Hero from '../state/Hero'

type Props = {}

function PlayerWritePermissionButton({ }: Props) {
    const [playerWritePermission, setPlayerWritePermission] = useState<boolean>((AppState.instance.currentEntity as any).playerWritePermission);
    useEffect(() => {
        setPlayerWritePermission((AppState.instance.currentEntity as any).playerWritePermission);
    }, [AppState.instance.currentEntity, (AppState.instance.currentEntity as any).playerWritePermission])
    return (AppState.instance.currentEntity as Hero).playerUser === null ? null : (
        <CheckButton value={playerWritePermission}
            onInput={(val: boolean) => {
                setPlayerWritePermission(val);
                (AppState.instance.currentEntity as any).playerWritePermission = val;
            }}>
            Player Edit Permission
        </CheckButton>
    )
}

export default observer(PlayerWritePermissionButton)