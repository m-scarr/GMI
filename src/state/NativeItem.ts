import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import EntityList from "./EntityList";
import InventoryItem from "./InventoryItem";
import Log from "./Log";
import Stat from "./Stat";
import { Category } from "./types";

export default class NativeItem {
    public readonly category: Category = Category.NativeItem;
    public readonly id!: number;
    private _name: string = "";

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
    }

    public get name(): string {
        return this._name;
    }


    @$update
    public set name(value: string) {
        this._name = value;
    }

    @$delete
    public delete() {

    }
}