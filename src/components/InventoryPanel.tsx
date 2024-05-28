import { observer } from "mobx-react-lite";
import AppState from "../state/AppState";
import InventoryItem from "../state/InventoryItem";
import { ModalType } from "../state/types";
import Button from "./Button";
import NumberInput from "./inputs/NumberInput";
import { useEffect, useState } from "react";
import { toJS } from "mobx";

function InventoryPanel() {
    const [entity, setEntity] = useState<any>(AppState.instance.currentEntity);

    useEffect(() => {
        setEntity(AppState.instance.currentEntity);
    }, [AppState.instance.currentEntity]);

    return (typeof entity.unique === "undefined" || entity.unique ? (
        <Button>
            <div>
                Inventory
            </div>
            <div style={{ transform: "translateX(-6px)", width: "calc(100% + 11px)", height: 250, overflowY: "scroll" }}>
                {
                    entity.inventoryItems.list.map((inventoryItem: InventoryItem) => {
                        return <InventoryItemPanel key={`inventory-item-button-${inventoryItem.id}`} inventoryItem={inventoryItem} />
                    })
                }
            </div>
        </Button>
    ) : null
    );
}

export default observer(InventoryPanel)


const InventoryItemPanel = observer(function InventoryItemPanel(props: { inventoryItem: InventoryItem }) {
    const [quantity, setQuantity] = useState<number>(props.inventoryItem.quantity);
    const [equipped, setEquipped] = useState<boolean>(props.inventoryItem.equipped);
    useEffect(() => { setQuantity(props.inventoryItem.quantity); }, [props.inventoryItem, props.inventoryItem.quantity])
    useEffect(() => {
        setEquipped(props.inventoryItem.equipped);

    }, [props.inventoryItem, props.inventoryItem.equipped])
    const unique = props.inventoryItem.nativeItem!.unique;
    const equippable = props.inventoryItem.nativeItem!.equippable;
    return <div
        onMouseEnter={() => {
            AppState.instance.setModalData("item", ["equipped"], props.inventoryItem.equipped);
            AppState.instance.setModalData("item", ["content"], props.inventoryItem.nativeItem);
            AppState.instance.currentModal = ModalType.Item;
        }}
        onMouseLeave={() => {
            AppState.instance.currentModal = null;
        }}>
        <Button>
            <div style={{ display: "flex", flexDirection: "row" }}>
                {equippable ?
                    <div className="hoverable" style={{ alignSelf: "stretch", alignContent: "center", transform: "translateX(-6px)" }}
                        onClick={() => {
                            const newVal = !equipped;
                            props.inventoryItem.equipped = newVal;
                            AppState.instance.setModalData("item", ["equipped"], newVal);
                        }}>
                        <img alt="" src={`./assets/checkbox_${equipped ? 'filled' : 'empty'}.png`} />
                    </div> : null
                }
                <div style={{ width: "100%" }}>
                    {props.inventoryItem.nativeItem!.name}
                </div>
                {unique ?
                    <div className="hoverable" style={{ alignSelf: "stretch", alignContent: "center", transform: "translateX(6px)" }}
                        onClick={() => {
                            props.inventoryItem.quantity = 0;
                        }}>
                        <img alt="" src="./assets/x.png" />
                    </div> :
                    <div style={{ alignSelf: "stretch", alignContent: "center", transform: "translateX(6px)", width: 96 }}>
                        <NumberInput value={quantity} onInput={setQuantity} onIdle={(val: number) => { props.inventoryItem.quantity = val; }} fontSize={24} />
                    </div>
                }
            </div>
        </Button>
    </div>
});