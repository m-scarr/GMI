import { observer } from 'mobx-react-lite';
import MarkerPanel from '../components/MarkerPanel';
import HealthBar from '../components/HealthBar';
import UniqueButton from '../components/UniqueButton';
import LogPanel from '../components/LogPanel';
import ItemSelector from '../components/ItemSelector';
import InventoryPanel from '../components/InventoryPanel';
import DeleteButton from '../components/DeleteButton';
import DropDown from '../components/inputs/DropDown';
import { useState } from 'react';

type Props = {}

function HeroPanel({ }: Props) {
    const [temp, setTemp] = useState<number | null>(1);
    return (
        <>
            <HealthBar />
            <InventoryPanel />
            <ItemSelector />
            <DropDown
                value={temp}
                options={[{ id: 1, name: "option 1" }, { id: 2, name: "dog 2" }, { id: 3, name: "dog 3" }, { id: 4, name: "option 4" }, { id: 5, name: "option 5" }, { id: 6, name: "option 6" }]}
                onInput={(val: number) => { setTemp(val); }} />
            <MarkerPanel />
            <UniqueButton />
            <LogPanel />
            <DeleteButton />
        </>
    )
}

export default observer(HeroPanel);