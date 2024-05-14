import LogPanel from '../components/LogPanel';
import MarkerPanel from '../components/MarkerPanel';
import NotePanel from '../components/NotePanel';
import { observer } from 'mobx-react-lite';

type Props = {}

function CachePanel({ }: Props) {
    return (
        <>
            <MarkerPanel />
            <NotePanel />
            <LogPanel />
        </>
    )
}

export default observer(CachePanel);