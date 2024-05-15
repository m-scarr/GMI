import { observer } from 'mobx-react-lite';
import Modals from './templates/modals';
import Map from './templates/Map';
import LogOut from './components/LogOut';
import Menu from './templates/Menu';
import { useEffect } from 'react';
import AppState from './state/AppState';


function App() {
  useEffect(() => {
    return () => {
      clearInterval((AppState.instance as any)._tickInterval);
    }
  }, []);

  return (<>
    <Map />
    <Menu />
    <Modals />
    <LogOut />
  </>);
}

export default observer(App);
