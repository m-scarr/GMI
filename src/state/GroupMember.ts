import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import { Category } from "./types";

export default class GroupMember {
    public readonly category: Category = Category.GroupMember;
    public readonly id!: number;

    @$create
    public static create(_characterId: number, _groupId: number): any { }

    public static load(data: any): GroupMember {
        return new GroupMember(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
    }

    @$delete
    public delete() {

    }
}