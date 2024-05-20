import { observer } from "mobx-react-lite";
import AppState from "../state/AppState";
import Game from "../state/Game";

function RefreshButton() {
    return (
        <div className="hoverable" style={{
            position: "fixed",
            left: AppState.instance.showMenu ? 288 : 32,
            top: 0,
            borderBottomLeftRadius: AppState.instance.showMenu ? 4 : 0,
            borderBottomRightRadius: AppState.instance.showMenu ? 0 : 4,
            height: 36
        }}
            onClick={() => {
                Game.instance!.refresh();
            }}
        >
            <img alt="" src="./assets/refresh.png" />
        </div>
    )
}

export default observer(RefreshButton);