import { observer } from "mobx-react-lite"
import { ModalType } from "../../state/types"
import RegisterModal from "./Register"
import LogInModal from "./LogIn"
import AppState from "../../state/AppState"
import API from "../../API"
import ModeSelectorModal from "./ModeSelector"
import GameSelectorModal from "./GameSelector"

type Props = {}

function Modals({ }: Props) {
    const switchCase: any = {
        [ModalType.Register]: <RegisterModal />,
        [ModalType.LogIn]: <LogInModal />,
        [ModalType.ModeSelector]: <ModeSelectorModal />,
        [ModalType.GameSelector]: <GameSelectorModal />
    }
    return (AppState.instance.currentModal === null ? null :
        <div style={{ position: "fixed", left: 0, right: 0, top: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center" }}
            onClick={() => {
                //AppState.instance.currentModal = null;
            }}>
            {switchCase[AppState.instance.currentModal]}
        </div>
    )
}

export default observer(Modals)