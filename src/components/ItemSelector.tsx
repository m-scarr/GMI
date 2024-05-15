import { observer } from 'mobx-react-lite';
import Game from '../state/Game';
import NativeItem from '../state/NativeItem';
import { Category, ModalType } from '../state/types';
import Button from './Button';
import Entity from '../state/Entity';
import AppState from '../state/AppState';
import InventoryItem from '../state/InventoryItem';

type Props = {}

function ItemSelector({ }: Props) {
    return (
        <Button>
            <div>
                Add Items
            </div>
            <div style={{ transform: "translateX(-6px)", width: "calc(100% + 11px)", height: 250, overflowY: "scroll" }}>
                {
                    Game.instance![Category.NativeItem].list.map((item: NativeItem) => {
                        return Entity.hasItem(AppState.instance.currentEntity as any, item) ? null :
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
                                    InventoryItem.create(AppState.instance.currentEntity!.category, AppState.instance.currentEntity!.id, item.id);
                                    AppState.instance.currentModal = null;
                                }}>
                                    {item.name}
                                </Button>
                            </div>
                    })
                }
            </div>
        </Button>
    )
}

export default observer(ItemSelector);