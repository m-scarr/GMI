import { $create, $delete, $update } from "../API/connector";
import Enemy from "./Enemy";
import Entity from "./Entity";
import Game from "./Game";
import Group from "./Group";
import Hero from "./Hero";
import NPC from "./NPC";
import { Category } from "./types";

export default class GroupMember {
    public readonly category: Category = Category.GroupMember;
    public readonly id!: number;
    private _groupId: number | null = null;
    private _characterId: number | null = null;
    private _quantity: number = 0;
    private _updatedAt: string = "";
    private _createdAt: string = "";

    private _group: Group | null = null;
    private _character: Hero | NPC | Enemy | null = null;

    @$create
    public static create(_characterId: number, _groupId: number): any { }

    public static load(data: any): GroupMember {
        return new GroupMember(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
        this._group = Game.instance!.findEntity(Category.Group, this._groupId!);
        this._character = Game.instance!.findCharacter(this._characterId!);
        this._group!.groupMembers.add(this);
        this._character!.groupMembers.add(this);
    }

    public get group() {
        return this._group;
    }

    public get character() {
        return this._character;
    }

    @$update
    public set quantity(value: number) {
        this._quantity = value;
    }

    public get quantity(): number {
        return this._quantity;
    }

    @$delete
    public delete() {
    }
}