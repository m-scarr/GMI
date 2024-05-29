import AppState from '../../state/AppState';
import { observer } from 'mobx-react-lite';
import { Category, ModalType } from '../../state/types';
import API from '../../API';
import Game from '../../state/Game';

function PlayerCharacterSelectorModal() {
  return (
    <div className="modal" style={{ width: "30vw" }} onClick={(e: any) => {
      e.stopPropagation();
    }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className='hoverable' style={{ padding: 4, borderRadius: 16, paddingBottom: 0 }} onClick={() => { AppState.instance.currentModal = ModalType.ModeSelector }}>
          <img alt="back" src="./assets/back.png" />
        </div>
        <div style={{ width: "100%" }}>Characters</div>
      </div>
      <hr />
      <div style={{ height: "40vh", overflowY: "scroll" }}>
        {AppState.instance.modals.playerCharacters.map((playerCharacter: any) => {
          console.log(playerCharacter);
          return (
            <div key={'player-character-button-' + playerCharacter.id}>
              <button key={'player-character-button-' + playerCharacter.id} onClick={async () => {
                Game.openPlayerCharacter(await API.read(Category.Hero, playerCharacter.id));
              }}>
                {playerCharacter.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default observer(PlayerCharacterSelectorModal);