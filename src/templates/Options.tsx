import React, { useState } from 'react'
import TextInput from '../components/inputs/TextInput'
import DropDown from '../components/inputs/DropDown'

type Props = {}

export default function Options({ }: Props) {
  const [temp, setTemp] = useState<number | null>(1)
  return (
    <>
      <TextInput value={""} onInput={() => { }} fontSize={24} />
      <DropDown
        value={temp}
        options={[{ id: 1, name: "option 1" }, { id: 2, name: "dog 2" }, { id: 3, name: "dog 3" }, { id: 4, name: "option 4" }, { id: 5, name: "option 5" }, { id: 6, name: "option 6" }]}
        onInput={(val: number) => { setTemp(val); }} />
    </>
  )
}