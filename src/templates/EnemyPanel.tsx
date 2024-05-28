import { observer } from 'mobx-react-lite';
import MarkerPanel from '../components/MarkerPanel';
import HealthBar from '../components/HealthBar';
import UniqueButton from '../components/UniqueButton';
import LogPanel from '../components/LogPanel';
import InventoryPanel from '../components/InventoryPanel';
import ItemSelector from '../components/ItemSelector';
import DeleteButton from '../components/DeleteButton';

function EnemyPanel() {
    return (
        <>
            <HealthBar />
            <MarkerPanel />
            <UniqueButton />
            <InventoryPanel />
            <ItemSelector />
            <LogPanel />
            <DeleteButton />
        </>
    )
}

export default observer(EnemyPanel);