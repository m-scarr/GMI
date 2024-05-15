import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import NativeItem from "./NativeItem";
import Cache from "./Cache";
import { Category } from "./types";
import Hero from "./Hero";
import NPC from "./NPC";
import Enemy from "./Enemy";
import Game from "./Game";
import AppState from "./AppState";

export default class InventoryItem {
    public readonly category: Category = Category.InventoryItem;
    public readonly id!: number;

    private _ownerCategory: Category | null = null;
    private _ownerId: number | null = null;
    private _nativeItemId: number | null = null;
    private _quantity: number = 1;
    private _equipped: boolean = false;

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
        if (this._nativeItem!.unique) {
            while (this._nativeItem!.inventoryItems.list.length > 0) {
                this._nativeItem!.inventoryItems.list[0].forceDelete();
            }
        }
        this._owner!.inventoryItems.add(this);
        this._nativeItem!.inventoryItems.add(this);
    }

    public get quantity() {
        return this._quantity;
    }

    @$update
    public set quantity(value: number) {
        this._quantity = value;
        if (value < 1) {
            AppState.instance.currentModal = null;
            this.forceDelete();
        }
    }

    public get equipped() {
        return this._equipped;
    }

    @$update
    public set equipped(value: boolean) {
        this._equipped = value;
    }


    public get owner() {
        return this._owner;
    }

    public get nativeItem() {
        return this._nativeItem;
    }

    public forceDelete() {
        this._owner!.inventoryItems.remove(this);
        this._nativeItem!.inventoryItems.remove(this);
    }
}