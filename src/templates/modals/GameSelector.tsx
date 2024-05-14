import AppState from '../../state/AppState';
import { observer } from 'mobx-react-lite';
import Game from '../../state/Game';
import { ModalType } from '../../state/types';
import Button from '../../components/Button';

type Props = {}

function GameSelectorModal({ }: Props) {
  return (
    <div className="modal" style={{ width: "30vw" }} onClick={(e: any) => {
      e.stopPropagation();
    }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className='hoverable' style={{ padding: 4, borderRadius: 16, paddingBottom: 0 }} onClick={() => { AppState.instance.currentModal = ModalType.ModeSelector }}>
          <img alt="back" src="./assets/back.png" />
        </div>
        <div style={{ width: "100%" }}>Games</div>
      </div>
      <hr />
      <div style={{ height: "40vh", overflowY: "scroll" }}>
        {AppState.instance.modals.games.map((game: Game) => {
          return (
            <div key={'game-button-' + game.id}>
              <button key={'game-button-' + game.id} onClick={() => { game.open(); }}>
                {game.name}
              </button>
            </div>
          );
        })}
        <button onClick={async () => {
          await Game.create();
          AppState.instance.currentModal = ModalType.GameSelector;
        }}>
          +
        </button>
      </div>
    </div>
  )
}

export default observer(GameSelectorModal);