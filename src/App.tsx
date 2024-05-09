import { observer } from 'mobx-react-lite';
import Modals from './templates/modals';
import Map from './templates/Map';


function App() {
  return (<>
    <Map />
    <Modals />
  </>)

}

export default observer(App);
