import AppState from '../../state/AppState';
import { observer } from 'mobx-react-lite';
import Game from '../../state/Game';
import { ModalType } from '../../state/types';

type Props = {}

function GameSelectorModal({ }: Props) {
  return (
    <div className="modal" onClick={(e: any) => {
      e.stopPropagation();
    }}>
      Games
      <hr />
      {AppState.instance.modals.games.map((game: Game) => {
        return (
          <div key={'game-button-' + game.id} onClick={() => { game.open(); }}>
            {game.name}
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
  )
}

export default observer(GameSelectorModal);