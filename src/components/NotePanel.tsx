import { useEffect, useState } from 'react'
import Button from './Button'
import TextInput from './inputs/TextInput';
import AppState from '../state/AppState';
import { observer } from 'mobx-react-lite';

type Props = {}

function NotePanel({ }: Props) {
    const [text, setText] = useState<string>((AppState.instance.currentEntity as any).notes);
    const [entity, setEntity] = useState(AppState.instance.currentEntity as any);
    useEffect(() => {
        if (AppState.instance.currentEntity) {
            setText((AppState.instance.currentEntity as any).notes);
            setEntity(AppState.instance.currentEntity as any);
        }
    }, [AppState.instance.currentEntity, (AppState.instance.currentEntity as any).notes]);
    return (
        <Button>
            <div>Notes</div>
            <TextInput value={text} onInput={setText} minRows={10} locking={true} fontSize={24} onIdle={(val: string) => {
                entity.notes = val;
            }} />
        </Button>
    )
}

export default observer(NotePanel);