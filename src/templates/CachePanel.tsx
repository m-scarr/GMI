import DeleteButton from '../components/DeleteButton';
import InventoryPanel from '../components/InventoryPanel';
import ItemSelector from '../components/ItemSelector';
import LogPanel from '../components/LogPanel';
import MarkerPanel from '../components/MarkerPanel';
import NotePanel from '../components/NotePanel';
import { observer } from 'mobx-react-lite';

function CachePanel() {
    return (
        <>
            <MarkerPanel />
            <InventoryPanel />
            <ItemSelector />
            <NotePanel />
            <LogPanel />
            <DeleteButton />
        </>
    )
}

export default observer(CachePanel);