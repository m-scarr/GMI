import IconPanel from '../components/IconPanel';
import NotePanel from '../components/NotePanel';
import UniqueButton from '../components/UniqueButton';
import CurrencyButton from '../components/CurrencyButton';
import EquippableButton from '../components/EquippableButton';
import { observer } from 'mobx-react-lite';
import LogPanel from '../components/LogPanel';
import StatPanel from '../components/StatPanel';

type Props = {}

function NativeItemPanel({ }: Props) {
    return (
        <>
            <StatPanel />
            <IconPanel />
            <UniqueButton />
            <CurrencyButton />
            <EquippableButton />
            <NotePanel />
            <LogPanel />
        </>
    )
}

export default observer(NativeItemPanel);