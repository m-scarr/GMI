import { observer } from 'mobx-react-lite';
import AppState from '../state/AppState';
import Hero from '../state/Hero';
import { ModalType } from '../state/types';
import Button from './Button';

function PlayerUserButton() {
  return (
    <Button hoverable={true} onClick={() => { AppState.instance.currentModal = ModalType.UserSelector }}>Player User:<br />
      {(AppState.instance.currentEntity as Hero).playerUser === null ?
        "None"
        :
        (AppState.instance.currentEntity as Hero).playerUser!.logInName}
    </Button>
  )
}

export default observer(PlayerUserButton);