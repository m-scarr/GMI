import { observer } from "mobx-react-lite"
import { ModalType } from "../../state/types"
import RegisterModal from "./Register"
import LogInModal from "./LogIn"
import AppState from "../../state/AppState"

type Props = {}

function Modals({ }: Props) {
    return (AppState.instance.currentModal === null ? null :
        ({
            [ModalType.Register]: <RegisterModal />,
            [ModalType.LogIn]: <LogInModal />
        } as any)[AppState.instance.currentModal])
}

export default observer(Modals)