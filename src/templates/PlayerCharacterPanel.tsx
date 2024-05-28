import { observer } from 'mobx-react-lite';
import MarkerPanel from '../components/MarkerPanel';
import HealthBar from '../components/HealthBar';
import LogPanel from '../components/LogPanel';
import ItemSelector from '../components/ItemSelector';
import InventoryPanel from '../components/InventoryPanel';
import GroupSelector from '../components/GroupSelector';
import { useEffect, useRef } from 'react';
import NameInput from '../components/NameInput';
import AppState from '../state/AppState';

function PlayerCharacterPanel() {
    const nameInputRef = useRef<any>(null);
    useEffect(() => { }, [AppState.instance.tick]);

    return (
        <>
            <div style={{ position: "fixed", zIndex: 5, width: 270 }} ref={nameInputRef}>
                <NameInput />
            </div>
            <div style={{ height: (nameInputRef.current !== null ? nameInputRef.current.clientHeight + 8 : 42) }} />
            <HealthBar />
            <MarkerPanel />
            <GroupSelector />
            <InventoryPanel />
            <ItemSelector />
            <LogPanel />
        </>
    )
}

export default observer(PlayerCharacterPanel);