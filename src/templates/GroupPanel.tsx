import NotePanel from '../components/NotePanel';
import MarkerPanel from '../components/MarkerPanel';
import { observer } from 'mobx-react-lite';
import LogPanel from '../components/LogPanel';

type Props = {}

function GroupPanel({ }: Props) {
    return (
        <>
            <MarkerPanel />
            <NotePanel />
            <LogPanel />
        </>
    )
}

export default observer(GroupPanel);