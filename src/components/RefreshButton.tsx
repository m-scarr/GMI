import { observer } from "mobx-react-lite";
import AppState from "../state/AppState";
import Game from "../state/Game";
import { useEffect } from "react";

function RefreshButton() {
    useEffect(() => { }, [AppState.instance.tick])
    return Game.instance !== null ? (
        <div className="hoverable" style={
            AppState.instance.gameMasterMode || !AppState.instance.showMenu ?
                {
                    position: "fixed",
                    left: AppState.instance.showMenu ? 288 : 32,
                    top: 0,
                    borderBottomLeftRadius: AppState.instance.showMenu ? 4 : 0,
                    borderBottomRightRadius: AppState.instance.showMenu ? 0 : 4,
                    height: 36
                } : {
                    position: "fixed",
                    left: AppState.instance.showMenu ? 270 : 32,
                    width: 33,
                    top: 0,
                    borderBottomRightRadius: AppState.instance.showMenu ? 0 : 4,
                    height: 40,
                    backgroundColor: "green"
                }}
            onClick={() => {
                Game.instance!.refresh();
            }}
        >
            <div style={{ paddingTop: 4, height: 36 }} className={AppState.instance.gameMasterMode || !AppState.instance.showMenu ? "" : "hoverable"}>
                <img alt="" src="./assets/refresh.png" />
            </div>
        </div>
    ) : null;
}

export default observer(RefreshButton);