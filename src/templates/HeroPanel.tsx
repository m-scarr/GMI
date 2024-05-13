import { observer } from 'mobx-react-lite'
import MarkerPanel from '../components/MarkerPanel';
import HealthBar from '../components/HealthBar';
import CheckButton from '../components/inputs/CheckButton';
import { useState } from 'react';
import UniqueButton from '../components/UniqueButton';
import NotePanel from '../components/NotePanel';

type Props = {}

function HeroPanel({ }: Props) {

    return (
        <div>
            <HealthBar />
            <MarkerPanel />
            <UniqueButton />
        </div>
    )
}

export default observer(HeroPanel);