import MarkerPanel from '../components/MarkerPanel';
import MapPanel from '../components/MapPanel';
import NotePanel from '../components/NotePanel';
import { observer } from 'mobx-react-lite';
import LogPanel from '../components/LogPanel';
import DeleteButton from '../components/DeleteButton';
import Button from '../components/Button';

type Props = {}

function BattlefieldPanel({ }: Props) {
    return (
        <>
            <Button>
                This feature is not yet complete- expected release of this feature is 06/2024
            </Button>
            <MarkerPanel />
            <MapPanel />
            <NotePanel />
            <LogPanel />
            <DeleteButton />
        </>
    )
}

export default observer(BattlefieldPanel);