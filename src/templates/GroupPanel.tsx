import NotePanel from '../components/NotePanel';
import MarkerPanel from '../components/MarkerPanel';
import { observer } from 'mobx-react-lite';
import LogPanel from '../components/LogPanel';
import MemberSelector from '../components/MemberSelector';
import Roster from '../components/Roster';
import DeleteButton from '../components/DeleteButton';

type Props = {}

function GroupPanel({ }: Props) {
    return (
        <>
            <MarkerPanel />
            <Roster />
            <MemberSelector />
            <NotePanel />
            <LogPanel />
            <DeleteButton />
        </>
    )
}

export default observer(GroupPanel);