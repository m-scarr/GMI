import React from 'react'
import NotePanel from '../components/NotePanel'
import MarkerPanel from '../components/MarkerPanel'

type Props = {}

export default function GroupPanel({ }: Props) {
    return (
        <div>
            <MarkerPanel />
            <NotePanel />
        </div>
    )
}