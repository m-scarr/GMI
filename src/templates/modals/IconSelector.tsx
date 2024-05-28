import { observer } from "mobx-react-lite";
import AppState, { checkImageSrc } from "../../state/AppState";
import NativeItem from "../../state/NativeItem";

function IconSelectorModal() {
    return (
        <div className="modal" style={{ display: "flex", flexDirection: "column", width: "80%" }} onClick={(e: any) => {
            e.stopPropagation();
        }}>
            <div style={{ fontSize: 48 }}>
                Icons
            </div>
            <div>
                These icons were purchased in a <a href="https://www.gamedevmarket.net/asset/16x16-icons-for-rpg-pack-1-915" target="_blank">humble bundle</a>
            </div>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                {Object.keys(AppState.instance.modals.iconSelector.icons).map((iconKey: any) => {
                    const iconData = AppState.instance.modals.iconSelector.icons[iconKey];
                    return <div className="hoverable" style={AppState.instance.modals.iconSelector.iconType === iconKey ? {
                        borderRadius: 32,
                        backgroundColor: `rgba(255, 255, 255, .4)`, width: "14%"
                    } : { borderRadius: 32, width: "14%" }}
                        onClick={() => {
                            AppState.instance.setModalData("iconSelector", ["iconType"], iconKey);
                        }}
                        key={`icon-type-${iconData.name}`}>
                        <div
                            style={{ margin: 16 }}>
                            {iconData.name}
                        </div>
                    </div>
                })}
                <div className="hoverable" style={{ borderRadius: 32, width: "14%" }}
                    onClick={async () => {
                        const newSrc = window.prompt("Enter a new URL for your marker!");
                        if (newSrc && await checkImageSrc(newSrc)) {
                            (AppState.instance.currentEntity as NativeItem).iconSrc = newSrc;
                            AppState.instance.currentModal = null;
                        }
                    }}
                    key={`icon-type-custom`}>
                    <div
                        style={{ margin: 16 }}>
                        Custom
                    </div>
                </div>
            </div>
            <div style={{ height: "60vh", overflowY: "scroll" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                    {AppState.instance.modals.iconSelector.icons[AppState.instance.modals.iconSelector.iconType].sources.map((iconSrc: string) => {
                        return <div className="hoverable" key={iconSrc} style={{ width: 64, height: 64, margin: 4, borderRadius: 8, padding: 4 }}>
                            <img
                                alt=""
                                src={iconSrc}
                                style={{ imageRendering: "pixelated", width: 64 }}
                                onClick={() => {
                                    (AppState.instance.currentEntity as NativeItem).iconSrc = iconSrc;
                                    AppState.instance.currentModal = null;
                                }} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default observer(IconSelectorModal);