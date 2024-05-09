import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import EntityList from "./EntityList";
import Log from "./Log";
import { Category } from "./types";

export default class Locale {
    public readonly category: Category = Category.Locale;
    public readonly id!: number;
    private _name: string = "";

    public logs: EntityList<Log> = new EntityList<Log>();

    @$create
    public static create(): any { }

    public static load(data: any): Locale {
        return new Locale(data);
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