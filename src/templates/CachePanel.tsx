import MarkerPanel from '../components/MarkerPanel';
import NotePanel from '../components/NotePanel';
import { observer } from 'mobx-react-lite';

type Props = {}

function CachePanel({ }: Props) {
    return (
        <>
            <MarkerPanel />
            <NotePanel />
        </>
    )
}

export default observer(CachePanel);