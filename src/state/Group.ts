import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import { Category } from "./types";

export default class Group {
    public readonly category: Category = Category.Group;
    public readonly id!: number;
    private _name: string = "";


    @$create
    public static create(): any { }

    public static load(data: any): Group {
        return new Group(data);
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