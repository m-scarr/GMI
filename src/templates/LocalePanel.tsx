import LogPanel from '../components/LogPanel';
import MapPanel from '../components/MapPanel';
import MarkerPanel from '../components/MarkerPanel';
import NotePanel from '../components/NotePanel';
import { observer } from 'mobx-react-lite';

type Props = {}

function LocalePanel({ }: Props) {
    return (
        <>
            <MarkerPanel />
            <MapPanel />
            <NotePanel />
            <LogPanel />
        </>
    )
}

export default observer(LocalePanel);