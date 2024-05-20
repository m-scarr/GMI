import { observer } from "mobx-react-lite";
import Button from "../components/Button";
import TextInput from "../components/inputs/TextInput";
import Game from "../state/Game";
import { useState } from "react";
import AppState from "../state/AppState";
import { ModalType } from "../state/types";

function Options() {
  const [name, setName] = useState<string>(Game.instance!.name);
  return (
    <>
      <div style={{ cursor: "pointer", backgroundColor: "rgba(255, 255, 255, .1)", marginTop: 16, marginBottom: 16, borderTop: "1px solid white", borderBottom: "1px solid white" }}>
        <div style={{ padding: 6 }}>
          Game Name
        </div>
        <TextInput
          fontSize={24}
          value={name}
          onInput={(val: any) => {
            setName(val);
          }}
          onIdle={(val: any) => {
            Game.instance!.name = val;
          }} />
      </div>
      <div className="hoverable" onClick={() => {
        AppState.instance.currentModal = ModalType.GameSelector;
      }}>
        <div style={{ cursor: "pointer", backgroundColor: "rgba(255, 255, 255, .1)", marginTop: 16, marginBottom: 16, borderTop: "1px solid white", borderBottom: "1px solid white", padding: 8 }}>
          Change Game
        </div>
      </div>
      <div className="hoverable" onClick={() => {
        AppState.instance.currentModal = ModalType.ModeSelector;
      }}>
        <div style={{ cursor: "pointer", backgroundColor: "rgba(255, 255, 255, .1)", marginTop: 16, marginBottom: 16, borderTop: "1px solid white", borderBottom: "1px solid white", padding: 8 }}>
          Change Mode
        </div>
      </div>
      <div className="hoverable" onClick={() => {
        Game.instance!.delete();
      }}>
        <div style={{ cursor: "pointer", backgroundColor: "rgba(255, 255, 255, .1)", marginTop: 16, marginBottom: 16, borderTop: "1px solid white", borderBottom: "1px solid white", padding: 8 }}>
          Delete Game
        </div>
      </div>
    </>
  )
}

export default observer(Options);