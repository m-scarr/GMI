import NotePanel from '../components/NotePanel';
import MarkerPanel from '../components/MarkerPanel';
import { observer } from 'mobx-react-lite';
import LogPanel from '../components/LogPanel';
import MemberSelector from '../components/MemberSelector';
import Roster from '../components/Roster';

type Props = {}

function GroupPanel({ }: Props) {
    return (
        <>
            <Roster />
            <MemberSelector />
            <MarkerPanel />
            <NotePanel />
            <LogPanel />
        </>
    )
}

export default observer(GroupPanel);