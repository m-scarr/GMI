import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import { Category } from "./types";

export default class InventoryItem {
    public readonly category: Category = Category.InventoryItem;
    public readonly id!: number;

    @$create
    public static create(_ownerCategory: Category, _ownerId: number, _nativeItemId: number): any { }

    public static load(data: any): InventoryItem {
        return new InventoryItem(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
    }

    @$delete
    public delete() {

    }
}