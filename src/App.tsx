import { observer } from 'mobx-react-lite';
import Modals from './templates/modals';
import Map from './templates/Map';
import LogOut from './components/LogOut';
import Menu from './templates/Menu';


function App() {
  return (<>
    <Map />
    <Menu />
    <Modals />
    <LogOut />
  </>);
}

export default observer(App);
