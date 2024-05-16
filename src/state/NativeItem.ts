import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import EntityList from "./EntityList";
import Game from "./Game";
import InventoryItem from "./InventoryItem";
import Log from "./Log";
import Stat from "./Stat";
import { Category } from "./types";

/*models.NativeItem.afterUpdate((item) => {
    if (item.dataValues.unique !== item._previousDataValues.unique) {
        models.InventoryItem.destroy({
            where: { nativeItemId: item.dataValues.id },
        });
        if (item.dataValues.unique) {
            item.update({ currency: false });
        }
    }
    if (
        item.dataValues.currency !== item._previousDataValues.currency &&
        item.dataValues.currency
    ) {
        item.update({ equippable: false, unique: false });
    }
    if (
        item.dataValues.equippable !== item._previousDataValues.equippable &&
        item.dataValues.equippable
    ) {
        item.update({ currency: false });
    }
});*/

export default class NativeItem {
    public readonly category: Category = Category.NativeItem;
    public readonly id!: number;
    private _name: string = "";
    private _iconSrc: string = "./assets/loot.png";
    private _icon: HTMLImageElement = new Image();
    private _currency: boolean = false;
    private _unique: boolean = true;
    private _equippable: boolean = false;
    private _notes:string = "";

    public logs: EntityList<Log> = new EntityList<Log>();
    public stats: EntityList<Stat> = new EntityList<Stat>();
    public inventoryItems: EntityList<InventoryItem> = new EntityList<InventoryItem>();

    @$create
    public static create(): any { }

    public static load(data: any): NativeItem {
        return new NativeItem(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
        this._icon.src = this._iconSrc;
    }

    public get notes() {
        return this._notes;
    }

    @$update
    public set notes(value:string) {
        this._notes = value;
    }

    public get name(): string {
        return this._name;
    }

    @$update
    public set name(value: string) {
        this._name = value;
    }

    public get currency(): boolean {
        return this._currency;
    }

    @$update
    public set currency(value: boolean) {
        if (value) {
            this._equippable = false;
            this._unique = false;
            while (this.inventoryItems.list.length > 0) {
                this.inventoryItems.list[0].forceDelete();
            }
        }
        this._currency = value;
    }

    public get equippable(): boolean {
        return this._equippable;
    }

    @$update
    public set equippable(value: boolean) {
        if (value) {
            this._currency = false;
        }
        this._equippable = value;
    }

    public get unique(): boolean {
        return this._unique;
    }

    @$update
    public set unique(value: boolean) {
        if (value) {
            this._currency = false;
        }
        while (this.inventoryItems.list.length > 0) {
            this.inventoryItems.list[0].forceDelete();
        }
        this._unique = value;
    }
    
    public get icon() {
        return this._icon;
    }

    public get iconSrc() {
        return this._iconSrc;
    }

    @$update
    public set iconSrc(value: string) {
        this._iconSrc = value;
        this._icon.src = value;
    }

    @$delete
    public delete() {
        this.forceDelete();
    }

    public forceDelete() {
        while (this.inventoryItems.list.length > 0) {
            this.inventoryItems.list[0].forceDelete();
        }
        while (this.logs.list.length > 0) {
            this.logs.list[0].forceDelete();
        }
        (Game.instance as any)[this.category].remove(this);
    }
}