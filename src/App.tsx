import API from './API';
import { observer } from 'mobx-react-lite';
import TextInput from './components/inputs/TextInput';
import { useState } from 'react';
import NumberInput from './components/inputs/NumberInput';
import SliderInput from './components/inputs/SliderInput';


function App() {
  const [testValue, setTestValue] = useState("Hello! this is an extra long string that takes two lines!");
  const [testValue2, setTestValue2] = useState(0);
  API.init();
  return (<>
    <TextInput value={testValue} onInput={setTestValue} fontSize={18} onIdle={() => { console.log("!!!"); }} locking={true}/>
    <NumberInput value={testValue2} onInput={setTestValue2} fontSize={18} onIdle={() => { console.log("!!!"); }} locking={true}/>
    <SliderInput value={testValue2} onInput={setTestValue2} fontSize={48} onIdle={() => { console.log("???"); }} locking={true}/>
  </>)

}

export default observer(App);
