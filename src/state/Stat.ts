import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import NativeItem from "./NativeItem";
import { Category } from "./types";

export default class Stat {
    public readonly category: Category = Category.Stat;
    public readonly id!: number;
    private _name: string = "";
    private _value: string = "";
    private _nativeItemId: number | null = null;

    private _nativeItem: NativeItem | null = null;

    @$create
    public static create(_nativeItemId: number): any { }

    public static load(data: any): Stat {
        return new Stat(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
    }

    public get name(): string {
        return this._name;
    }

    public get value(): string {
        return this._value;
    }

    public get nativeItem(): NativeItem | null {
        return this._nativeItem;
    }

    @$update
    public set name(value: string) {
        this._name = value;
    }

    @$update
    public set value(value: string) {
        this._value = value;
    }

    @$delete
    public delete() {

    }
}