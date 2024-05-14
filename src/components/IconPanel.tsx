import { observer } from "mobx-react-lite";
import AppState from "../state/AppState"
import Button from "./Button"
import NativeItem from "../state/NativeItem";
import { ModalType } from "../state/types";
import { useEffect } from "react";

type Props = {}

function IconPanel({ }: Props) {
    const entity = AppState.instance.currentEntity as NativeItem;
    const iconStyle = {
        transform: "translateY(-6px) translateX(6px)",
        paddingTop: 6,
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        marginRight: 1,
        marginLeft: 1,
        paddingRight: 1,
        paddingLeft: 1
    }
    return (
        <Button>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "100%" }}>
                    Icon
                </div>
                <div className="hoverable" style={iconStyle}>
                    <img src="./assets/edit.png"
                        onClick={() => {
                            //open icon modal
                            AppState.instance.currentModal = ModalType.IconSelector;
                        }}
                    />
                </div>
            </div>
            <img
                style={{
                    width: "100%",
                    imageRendering: "pixelated"
                }}
                alt="icon"
                src={entity.iconSrc}
            />
        </Button>
    )
}

export default observer(IconPanel);