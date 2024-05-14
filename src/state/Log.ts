import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import { Category, VisibleEntity } from "./types";
import NativeItem from "./NativeItem";
import Game from "./Game";

export default class Log {
    public readonly category: Category = Category.Log;
    public readonly id!: number;

    private _ownerCategory: Category | null = null;
    private _ownerId: number | null = null;
    private _text: string = "";
    private _owner: VisibleEntity | NativeItem | null = null;
    private _createdAt: string = "";

    @$create
    public static create(_ownerCategory: Category, _ownerId: number, _text: string): any { }

    public static load(data: any): Log {
        return new Log(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
        this._owner = Game.instance!.findEntity(this._ownerCategory!, this._ownerId!);
        (this._owner as any).logs.add(this);
    }

    public get createdAt() {
        return this._createdAt;
    }

    public get owner() {
        return this._owner;
    }

    public get text() {
        return this._text;
    }

    @$delete
    public delete() {

    }
}