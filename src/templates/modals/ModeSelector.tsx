import { observer } from 'mobx-react-lite';
import { Category, ModalType } from '../../state/types';
import AppState from '../../state/AppState';

type Props = {}

function ModeSelectorModal({ }: Props) {
  return (
    <div className="modal" onClick={(e: any) => {
      e.stopPropagation();
    }}>
      I am a...<br /><br />
      <button onClick={() => {
        AppState.instance.currentModal = ModalType.GameSelector;
      }}>Game Master</button>
      <hr />
      <button disabled>Player</button>
    </div>
  )
}

export default observer(ModeSelectorModal);