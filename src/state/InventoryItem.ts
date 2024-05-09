import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import NativeItem from "./NativeItem";
import Cache from "./Cache";
import { Category } from "./types";
import Hero from "./Hero";
import NPC from "./NPC";
import Enemy from "./Enemy";
import Game from "./Game";

export default class InventoryItem {
    public readonly category: Category = Category.InventoryItem;
    public readonly id!: number;

    private _ownerCategory: Category | null = null;
    private _ownerId: number | null = null;
    private _nativeItemId: number | null = null;

    private _owner: Hero | NPC | Enemy | Cache | null = null;
    private _nativeItem: NativeItem | null = null;

    @$create
    public static create(_ownerCategory: Category, _ownerId: number, _nativeItemId: number): any { }

    public static load(data: any): InventoryItem {
        return new InventoryItem(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
        this._owner = Game.instance!.findEntity(this._ownerCategory!, this._ownerId!);
        this._nativeItem = Game.instance!.findEntity(Category.NativeItem, this._nativeItemId!);
        this._owner!.inventoryItems.add(this);
        this._nativeItem!.inventoryItems.add(this);
    }

    public get owner() {
        return this._owner;
    }

    public get nativeItem() {
        return this._nativeItem;
    }

    @$delete
    public delete() {
    }
}