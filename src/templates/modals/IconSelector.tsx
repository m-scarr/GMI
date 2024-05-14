import { observer } from "mobx-react-lite";
import AppState from "../../state/AppState";
import NativeItem from "../../state/NativeItem";

type Props = {}

function IconSelector({ }: Props) {
    return (
        <div className="modal" style={{ display: "flex", flexDirection: "column", width: "80%" }} onClick={(e: any) => {
            e.stopPropagation();
        }}>
            <div>
                Icons
            </div>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                {Object.keys(AppState.instance.modals.iconSelector.icons).map((iconKey: any) => {
                    const iconData = AppState.instance.modals.iconSelector.icons[iconKey];
                    return <div className="hoverable" style={AppState.instance.modals.iconSelector.iconType === iconKey ? {
                        borderRadius: 32,
                        backgroundColor: `rgba(255, 255, 255, .4)`
                    } : { borderRadius: 32 }}
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
            </div>
            <div style={{ height: "60vh", overflowY: "scroll" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent:"space-around" }}>
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

export default observer(IconSelector);