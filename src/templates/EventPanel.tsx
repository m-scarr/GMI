import { observer } from 'mobx-react-lite';
import MarkerPanel from '../components/MarkerPanel';
import NotePanel from '../components/NotePanel';

type Props = {}

function EventPanel({ }: Props) {
    return (
        <>
            <MarkerPanel />
            <NotePanel />
        </>
    )
}

export default observer(EventPanel);