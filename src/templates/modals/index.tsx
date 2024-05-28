import { observer } from "mobx-react-lite"
import { ModalType } from "../../state/types"
import RegisterModal from "./Register"
import LogInModal from "./LogIn"
import AppState from "../../state/AppState"
import ModeSelectorModal from "./ModeSelector"
import GameSelectorModal from "./GameSelector"
import ItemModal from "./Item"
import IconSelectorModal from "./IconSelector"
import UserSelectorModal from "./UserSelector"
import PlayerCharacterSelectorModal from "./PlayerCharacterSelector"

type Props = {}

function Modals({ }: Props) {
    const switchCase: any = {
        [ModalType.Register]: <RegisterModal />,
        [ModalType.LogIn]: <LogInModal />,
        [ModalType.ModeSelector]: <ModeSelectorModal />,
        [ModalType.GameSelector]: <GameSelectorModal />,
        [ModalType.Item]: <ItemModal />,
        [ModalType.IconSelector]: <IconSelectorModal />,
        [ModalType.UserSelector]: <UserSelectorModal />,
        [ModalType.PlayerCharacterSelector]: <PlayerCharacterSelectorModal />
    }
    return (AppState.instance.currentModal === null ? null :
        <div style={{ pointerEvents: AppState.instance.currentModal === ModalType.Item ? 'none' : 'auto', position: "fixed", left: 0, right: 0, top: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center" }}
            onClick={() => {
                if (AppState.instance.currentModal === ModalType.IconSelector || AppState.instance.currentModal === ModalType.UserSelector) {
                    AppState.instance.currentModal = null;
                }
            }}>
            {switchCase[AppState.instance.currentModal]}
        </div>
    )
}

export default observer(Modals)