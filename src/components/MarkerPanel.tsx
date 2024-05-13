import { observer } from "mobx-react-lite";
import AppState, { checkImageSrc } from "../state/AppState"
import Button from "./Button"
import { VisibleEntity } from "../state/types";

type Props = {}

function MarkerPanel({ }: Props) {
    const entity = AppState.instance.currentEntity as VisibleEntity;
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
                    Marker
                </div>
                <div className="hoverable" style={iconStyle}>
                    <img src="./assets/edit.png"
                        onClick={async () => {
                            const newSrc = window.prompt("Enter a new URL for your marker!");
                            if (newSrc && await checkImageSrc(newSrc)) {
                                entity.markerSrc = newSrc;
                            }
                        }}
                    />
                </div>
                <div className="hoverable" style={iconStyle}>
                    <img src={`./assets/${entity.visible ? '' : 'in'}visible.png`}
                        onClick={() => {
                            entity.visible = !entity.visible;
                        }} />
                </div>
                <div className="hoverable" style={iconStyle}>
                    <img src="./assets/pin.png"
                        onClick={() => {
                            AppState.instance.droppingMarker = entity;
                        }}
                    />
                </div>
                <div className="hoverable" style={iconStyle}>
                    <img src="./assets/goto.png"
                        onClick={() => {
                            AppState.instance.goToEntity = entity;
                        }}
                    />
                </div>
            </div>
            <img
                style={{
                    width: "100%",
                    imageRendering: "pixelated"
                }}
                alt="marker"
                src={entity.markerSrc}
            />
        </Button>
    )
}

export default observer(MarkerPanel);