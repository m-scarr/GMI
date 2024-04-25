import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import { Category } from "./types";

export default class Log {
    public readonly category: Category = Category.Log;
    public readonly id!: number;


    @$create
    public static create(_ownerCategory: Category, _ownerId: number, _text: string): any { }

    public static load(data: any): Log {
        return new Log(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
    }

    @$delete
    public delete() {

    }
}