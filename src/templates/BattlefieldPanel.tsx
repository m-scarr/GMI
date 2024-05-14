import MarkerPanel from '../components/MarkerPanel';
import MapPanel from '../components/MapPanel';
import NotePanel from '../components/NotePanel';
import { observer } from 'mobx-react-lite';
import LogPanel from '../components/LogPanel';

type Props = {}

function BattlefieldPanel({ }: Props) {
    return (
        <>
            <MarkerPanel />
            <MapPanel />
            <NotePanel />
            <LogPanel />
        </>
    )
}

export default observer(BattlefieldPanel);