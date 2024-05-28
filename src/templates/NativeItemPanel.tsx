import IconPanel from '../components/IconPanel';
import NotePanel from '../components/NotePanel';
import UniqueButton from '../components/UniqueButton';
import CurrencyButton from '../components/CurrencyButton';
import EquippableButton from '../components/EquippableButton';
import { observer } from 'mobx-react-lite';
import LogPanel from '../components/LogPanel';
import StatPanel from '../components/StatPanel';
import DeleteButton from '../components/DeleteButton';

function NativeItemPanel() {
    return (
        <>
            <IconPanel />
            <UniqueButton />
            <CurrencyButton />
            <EquippableButton />
            <StatPanel />
            <NotePanel />
            <LogPanel />
            <DeleteButton />
        </>
    )
}

export default observer(NativeItemPanel);