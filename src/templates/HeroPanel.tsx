import { observer } from 'mobx-react-lite';
import MarkerPanel from '../components/MarkerPanel';
import HealthBar from '../components/HealthBar';
import UniqueButton from '../components/UniqueButton';
import LogPanel from '../components/LogPanel';
import ItemSelector from '../components/ItemSelector';
import InventoryPanel from '../components/InventoryPanel';

type Props = {}

function HeroPanel({ }: Props) {
    return (
        <>
            <HealthBar />
            <InventoryPanel />
            <ItemSelector />
            <MarkerPanel />
            <UniqueButton />
            <LogPanel />
        </>
    )
}

export default observer(HeroPanel);