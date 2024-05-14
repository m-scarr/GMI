import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import CheckButton from './inputs/CheckButton'
import AppState from '../state/AppState'

type Props = {}

function CurrencyButton({ }: Props) {
    const [currency, setCurrency] = useState<boolean>((AppState.instance.currentEntity as any).currency);
    useEffect(() => {
        setCurrency((AppState.instance.currentEntity as any).currency);
    }, [AppState.instance.currentEntity, (AppState.instance.currentEntity as any).currency])
    return (
        <CheckButton value={currency}
            onInput={(val: boolean) => {
                setCurrency(val);
                (AppState.instance.currentEntity as any).currency = val;
            }}>Currency</CheckButton>
    )
}

export default observer(CurrencyButton)