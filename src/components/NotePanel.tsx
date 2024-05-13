import React, { useEffect, useState } from 'react'
import Button from './Button'
import TextInput from './inputs/TextInput';
import AppState from '../state/AppState';
import Group from '../state/Group';

type Props = {}

export default function NotePanel({ }: Props) {
    const [text, setText] = useState<string>((AppState.instance.currentEntity as any).notes);
    useEffect(() => {
        setText((AppState.instance.currentEntity as any).notes);
    }, [AppState.instance.currentEntity, (AppState.instance.currentEntity as any).notes]);
    return (
        <Button>
            <div>Notes</div>
            <TextInput value={text} onInput={setText} locking={true} fontSize={24} onIdle={(val: string) => {
                (AppState.instance.currentEntity as any).notes = val;
            }} />
        </Button>
    )
}