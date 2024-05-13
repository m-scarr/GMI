import { observer } from "mobx-react-lite";
import AppState, { checkImageSrc } from "../state/AppState"
import Button from "./Button"
import { Category, VisibleEntity } from "../state/types";
import Battlefield from "../state/Battlefield";
import Locale from "../state/Locale";

type Props = {}

function MapPanel({ }: Props) {
    const entity = AppState.instance.currentEntity as (Battlefield | Locale);
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
                            if (AppState.instance.currentEntity?.category === Category.Locale) {
                                AppState.instance.currentLocale = AppState.instance.currentEntity as Locale;
                            } else {
                                //open the battlefield modal
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