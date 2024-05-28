import { observer } from 'mobx-react-lite';
import Modals from './templates/modals';
import Map from './templates/Map';
import LogOut from './components/LogOut';
import Menu from './templates/Menu';
import { useEffect } from 'react';
import AppState from './state/AppState';
import RefreshButton from './components/RefreshButton';


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
    <RefreshButton />
    {AppState.instance.loading ? <div style={{ position: "fixed", left: 0, right: 0, top: 0, bottom: 0, zIndex: 15, cursor: "wait" }}></div> : null}
  </>);
}

export default observer(App);
