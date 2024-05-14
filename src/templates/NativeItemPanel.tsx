import IconPanel from '../components/IconPanel';
import NotePanel from '../components/NotePanel';
import UniqueButton from '../components/UniqueButton';
import CurrencyButton from '../components/CurrencyButton';
import EquippableButton from '../components/EquippableButton';
import { observer } from 'mobx-react-lite';

type Props = {}

function NativeItemPanel({ }: Props) {
    return (
        <>
            <IconPanel />
            <UniqueButton />
            <CurrencyButton />
            <EquippableButton />
            <NotePanel />
        </>
    )
}

export default observer(NativeItemPanel);