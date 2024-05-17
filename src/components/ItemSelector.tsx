import { observer } from 'mobx-react-lite';
import Game from '../state/Game';
import NativeItem from '../state/NativeItem';
import { Category, ModalType } from '../state/types';
import Button from './Button';
import Entity from '../state/Entity';
import AppState from '../state/AppState';
import InventoryItem from '../state/InventoryItem';
import TextInput from './inputs/TextInput';
import { useEffect, useState } from 'react';

function ItemSelector() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [entity, setEntity] = useState<any>(AppState.instance.currentEntity);
    useEffect(() => {
        setEntity(AppState.instance.currentEntity);
    }, [AppState.instance.currentEntity])
    return (typeof entity.unique === "undefined" || entity.unique ? (
        <Button>
            <div style={{ paddingBottom: 8 }}>
                Add Items
            </div>
            <div style={{ width: "calc(100% + 12px)", transform: "translateX(-6px)" }}>
                <TextInput value={searchValue} onInput={setSearchValue} fontSize={24} placeholder={`Search Items...`} />
            </div>
            <div style={{ transform: "translateX(-6px)", width: "calc(100% + 11px)", height: 250, overflowY: "scroll" }}>
                {
                    Game.instance![Category.NativeItem].list.map((item: NativeItem) => {
                        return Entity.hasItem(entity, item) ? null :
                            <div
                                key={`item-button-${item.id}`}
                                onMouseEnter={() => {
                                    AppState.instance.setModalData("item", ["equipped"], false);
                                    AppState.instance.setModalData("item", ["content"], item);
                                    AppState.instance.currentModal = ModalType.Item;
                                }}
                                onMouseLeave={() => {
                                    AppState.instance.currentModal = null;
                                }}>
                                <Button hoverable={true} onClick={() => {
                                    InventoryItem.create(entity.category, entity.id, item.id);
                                    AppState.instance.currentModal = null;
                                }}>
                                    {item.name}
                                </Button>
                            </div>
                    })
                }
            </div>
        </Button>
    ) : null);
}

export default observer(ItemSelector);