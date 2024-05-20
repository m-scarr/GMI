import { observer } from "mobx-react-lite";
import AppState, { checkImageSrc } from "../state/AppState"
import Button from "./Button"
import { Category } from "../state/types";
import Locale from "../state/Locale";
import { useEffect, useState } from "react";

function MapPanel() {
    const [entity, setEntity] = useState(AppState.instance.currentEntity as any);
    useEffect(() => {
        setEntity(AppState.instance.currentEntity as any);
    }, [AppState.instance.currentEntity]);
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
                    Map
                </div>
                <div className="hoverable" style={iconStyle}>
                    <img src="./assets/edit.png"
                        onClick={async () => {
                            const newSrc = window.prompt("Enter a new URL for your map!");
                            if (newSrc && await checkImageSrc(newSrc)) {
                                entity.mapSrc = newSrc;
                            }
                        }}
                    />
                </div>
                <div className="hoverable" style={iconStyle}>
                    <img src="./assets/goto.png"
                        onClick={() => {
                            if (entity.category === Category.Locale) {
                                AppState.instance.currentLocale = entity as Locale;
                            } else {
                                //open the battlefield modal
                                alert("This feature is not yet implemented.")
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
                alt="map"
                src={entity.mapSrc}
            />
        </Button>
    )
}

export default observer(MapPanel);