import { observer } from "mobx-react-lite"
import AppState from "../state/AppState"
import InventoryItem from "../state/InventoryItem"
import { ModalType } from "../state/types"
import Button from "./Button"
import NumberInput from "./inputs/NumberInput"
import { useEffect, useState } from "react"

type Props = {}

function InventoryPanel({ }: Props) {
    return (
        <Button>
            <div>
                Inventory
            </div>
            <div style={{ transform: "translateX(-6px)", width: "calc(100% + 11px)", height: 250, overflowY: "scroll" }}>
                {
                    (AppState.instance.currentEntity as any).inventoryItems.list.map((inventoryItem: InventoryItem) => {
                        return <InventoryItemPanel key={`inventory-item-button-${inventoryItem.id}`} inventoryItem={inventoryItem} />
                    })
                }
            </div>
        </Button>
    )
}

export default observer(InventoryPanel)


const InventoryItemPanel = observer(function InventoryItemPanel(props: { inventoryItem: InventoryItem }) {
    const [quantity, setQuantity] = useState<number>(props.inventoryItem.quantity);
    useEffect(() => { setQuantity(props.inventoryItem.quantity); }, [props.inventoryItem, props.inventoryItem.quantity])
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
        <Button>{unique && !equippable ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "100%" }}>
                    {props.inventoryItem.nativeItem!.name}
                </div>
                <div className="hoverable" style={{ alignSelf: "stretch", alignContent: "center", transform: "translateX(6px)" }}
                    onClick={() => {
                        props.inventoryItem.quantity = 0;
                    }}>
                    <img alt="" src="./assets/x.png" />
                </div>
            </div>
        ) : unique && equippable ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="hoverable" style={{ alignSelf: "stretch", alignContent: "center", transform: "translateX(-6px)" }}
                    onClick={() => {
                        const newVal = !props.inventoryItem.equipped;
                        props.inventoryItem.equipped = newVal;
                        AppState.instance.setModalData("item", ["equipped"], newVal);
                    }}>
                    <img alt="" src={`./assets/checkbox_${props.inventoryItem.equipped ? 'filled' : 'empty'}.png`} />
                </div>
                <div style={{ width: "100%" }}>
                    {props.inventoryItem.nativeItem!.name}
                </div>
                <div className="hoverable" style={{ alignSelf: "stretch", alignContent: "center", transform: "translateX(6px)" }}
                    onClick={() => {
                        props.inventoryItem.quantity = 0;
                    }}>
                    <img alt="" src="./assets/x.png" />
                </div>
            </div>
        ) : !unique && equippable ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="hoverable" style={{ alignSelf: "stretch", alignContent: "center", transform: "translateX(-6px)" }}
                    onClick={() => {
                        const newVal = !props.inventoryItem.equipped;
                        props.inventoryItem.equipped = newVal;
                        AppState.instance.setModalData("item", ["equipped"], newVal);
                    }}>
                    <img alt="" src={`./assets/checkbox_${props.inventoryItem.equipped ? 'filled' : 'empty'}.png`} />
                </div>
                <div style={{ width: "100%" }}>
                    {props.inventoryItem.nativeItem!.name}
                </div>
                <div style={{ alignSelf: "stretch", alignContent: "center", transform: "translateX(6px)", width: 96 }}>
                    <NumberInput value={quantity} onInput={setQuantity} onIdle={(val: number) => { props.inventoryItem.quantity = val; }} fontSize={24} />
                </div>
            </div>
        ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "100%" }}>
                    {props.inventoryItem.nativeItem!.name}
                </div>
                <div style={{ alignSelf: "stretch", alignContent: "center", transform: "translateX(6px)", width: 96 }}>
                    <NumberInput value={quantity} onInput={setQuantity} onIdle={(val: number) => { props.inventoryItem.quantity = val; }} fontSize={24} />
                </div>
            </div>
        )}
        </Button>
    </div>
});