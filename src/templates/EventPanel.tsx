import { observer } from 'mobx-react-lite';
import MarkerPanel from '../components/MarkerPanel';
import NotePanel from '../components/NotePanel';
import LogPanel from '../components/LogPanel';
import DeleteButton from '../components/DeleteButton';

function EventPanel() {
    return (
        <>
            <MarkerPanel />
            <NotePanel />
            <LogPanel />
            <DeleteButton />
        </>
    )
}

export default observer(EventPanel);