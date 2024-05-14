import NotePanel from '../components/NotePanel';
import MarkerPanel from '../components/MarkerPanel';
import { observer } from 'mobx-react-lite';

type Props = {}

function GroupPanel({ }: Props) {
    return (
        <>
            <MarkerPanel />
            <NotePanel />
        </>
    )
}

export default observer(GroupPanel);