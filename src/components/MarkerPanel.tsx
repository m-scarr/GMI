import { observer } from "mobx-react-lite";
import AppState, { checkImageSrc } from "../state/AppState";
import Button from "./Button";
import { useEffect, useState } from "react";
import { Category } from "../state/types";

type Props = {}

function MarkerPanel({ }: Props) {
    //const entity = AppState.instance.currentEntity as VisibleEntity;
    const [entity, setEntity] = useState<any>(AppState.instance.currentEntity);
    const [visibilityEnabled, setVisibilityEnabled] =
        useState<boolean>(typeof (AppState.instance.currentEntity as any).unique === "undefined" || ((AppState.instance.currentEntity as any).unique &&
            (typeof (AppState.instance.currentEntity as any).groupMembers === "undefined" || (AppState.instance.currentEntity as any).groupMembers.list.length < 1)));

    const [placingEnabled, setPlacingEnabled] =
        useState<boolean>(typeof (AppState.instance.currentEntity as any).unique === "undefined" || ((AppState.instance.currentEntity as any).unique &&
            (typeof (AppState.instance.currentEntity as any).groupMembers === "undefined" || (AppState.instance.currentEntity as any).groupMembers.list.length < 1)));

    const [goToEnabled, setGoToEnabled] =
        useState<boolean>(typeof (AppState.instance.currentEntity as any).unique === "undefined" || (AppState.instance.currentEntity as any).unique);

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

    useEffect(() => {
        setEntity(AppState.instance.currentEntity)
        setVisibilityEnabled(typeof (AppState.instance.currentEntity as any).unique === "undefined" || ((AppState.instance.currentEntity as any).unique &&
            (typeof (AppState.instance.currentEntity as any).groupMembers === "undefined" || (AppState.instance.currentEntity as any).groupMembers.list.length < 1)));
        setPlacingEnabled(typeof (AppState.instance.currentEntity as any).unique === "undefined" || ((AppState.instance.currentEntity as any).unique &&
            (typeof (AppState.instance.currentEntity as any).groupMembers === "undefined" || (AppState.instance.currentEntity as any).groupMembers.list.length < 1)));
        setGoToEnabled(typeof (AppState.instance.currentEntity as any).unique === "undefined" || (AppState.instance.currentEntity as any).unique);
    }, [AppState.instance.currentEntity, (AppState.instance.currentEntity as any).unique]);

    if (typeof (AppState.instance.currentEntity as any).groupMembers !== "undefined") {
        useEffect(() => {
            setEntity(AppState.instance.currentEntity)
            setVisibilityEnabled(typeof (AppState.instance.currentEntity as any).unique === "undefined" || ((AppState.instance.currentEntity as any).unique &&
                (typeof (AppState.instance.currentEntity as any).groupMembers === "undefined" || (AppState.instance.currentEntity as any).groupMembers.list.length < 1)));
            setPlacingEnabled(typeof (AppState.instance.currentEntity as any).unique === "undefined" || ((AppState.instance.currentEntity as any).unique &&
                (typeof (AppState.instance.currentEntity as any).groupMembers === "undefined" || (AppState.instance.currentEntity as any).groupMembers.list.length < 1)));
            setGoToEnabled(typeof (AppState.instance.currentEntity as any).unique === "undefined" || (AppState.instance.currentEntity as any).unique);
        }, [(AppState.instance.currentEntity as any).groupMembers.list]);
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
                <div className={visibilityEnabled ? "hoverable" : ''} style={iconStyle}>
                    <img src={`./assets/${entity.visible ? '' : 'in'}visible.png`}
                        style={{ opacity: visibilityEnabled ? 1 : .5 }}
                        onClick={() => {
                            if (visibilityEnabled) {
                                entity.visible = !entity.visible;
                            }
                        }} />
                </div>
                <div className={placingEnabled ? "hoverable" : ''} style={iconStyle}>
                    <img src="./assets/pin.png"
                        style={{ opacity: placingEnabled ? 1 : .5 }}
                        onClick={() => {
                            if (placingEnabled) {
                                AppState.instance.droppingMarker = entity;
                            }
                        }}
                    />
                </div>
                <div className={goToEnabled ? "hoverable" : ''} style={iconStyle}>
                    <img src="./assets/goto.png"
                        style={{ opacity: goToEnabled ? 1 : .5 }}
                        onClick={() => {
                            if (goToEnabled) {
                                AppState.instance.goToEntity = entity;
                            }
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