import { observer } from 'mobx-react-lite';
import MarkerPanel from '../components/MarkerPanel';
import HealthBar from '../components/HealthBar';
import UniqueButton from '../components/UniqueButton';
import LogPanel from '../components/LogPanel';
import ItemSelector from '../components/ItemSelector';
import InventoryPanel from '../components/InventoryPanel';
import DeleteButton from '../components/DeleteButton';
import GroupSelector from '../components/GroupSelector';
import AppState from '../state/AppState';
import { useState } from 'react';

type Props = {}

function HeroPanel({ }: Props) {
    return (
        <>
            <HealthBar />
            <MarkerPanel />
            <UniqueButton />
            <GroupSelector />
            <InventoryPanel />
            <ItemSelector />
            <LogPanel />
            <DeleteButton />
        </>
    )
}

export default observer(HeroPanel);