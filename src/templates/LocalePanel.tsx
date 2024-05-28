import DeleteButton from '../components/DeleteButton';
import LogPanel from '../components/LogPanel';
import MapPanel from '../components/MapPanel';
import MarkerPanel from '../components/MarkerPanel';
import NotePanel from '../components/NotePanel';
import { observer } from 'mobx-react-lite';

function LocalePanel() {
    return (
        <>
            <MarkerPanel />
            <MapPanel />
            <NotePanel />
            <LogPanel />
            <DeleteButton />
        </>
    )
}

export default observer(LocalePanel);