import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import { Category } from "./types";

export default class Event {
    public readonly category: Category = Category.Event;
    public readonly id!: number;
    private _name: string = "";


    @$create
    public static create(): any { }

    public static load(data: any): Event {
        return new Event(data);
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