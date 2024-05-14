import { observer } from 'mobx-react-lite';
import MarkerPanel from '../components/MarkerPanel';
import NotePanel from '../components/NotePanel';
import LogPanel from '../components/LogPanel';

type Props = {}

function EventPanel({ }: Props) {
    return (
        <>
            <MarkerPanel />
            <NotePanel />
            <LogPanel />
        </>
    )
}

export default observer(EventPanel);