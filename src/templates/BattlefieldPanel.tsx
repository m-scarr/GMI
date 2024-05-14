import MarkerPanel from '../components/MarkerPanel';
import MapPanel from '../components/MapPanel';
import NotePanel from '../components/NotePanel';
import { observer } from 'mobx-react-lite';

type Props = {}

function BattlefieldPanel({ }: Props) {
    return (
        <>
            <MarkerPanel />
            <MapPanel />
            <NotePanel />
        </>
    )
}

export default observer(BattlefieldPanel);