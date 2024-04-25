import { $create, $delete, $update } from "../API/connector";
import Combatant from "./Combatant";
import Entity from "./Entity";
import GroupMember from "./GroupMember";
import InventoryItem from "./InventoryItem";
import Log from "./Log";
import { Category } from "./types";

export default class Hero {
    public readonly category: Category = Category.Hero;
    public readonly id!: number;
    private _name: string = "New Hero";
    private _localeId: number | null = null;
    private _x: number | null = null;
    private _y: number | null = null;
    private _unique: boolean = true;
    private _visible: boolean = true;
    private _hp: number = 10;
    private _maxHp: number = 10;
    private _playerWritePermission: boolean = false;
    private _playerUserId: number | null = null;
    private _createdAt: string = "";
    private _updatedAt: string = "";
    private _markerSrc: string = "./assets/hero.png";

    private _groupMembers: GroupMember[] = [];
    private _combatants: Combatant[] = [];
    private _inventoryItems: InventoryItem[] = [];
    private _logs: Log[] = [];

    public get location(): { localeId: number | null, x: number | null, y: number | null } {
        return { localeId: this._localeId, x: this._x, y: this._y }
    }

    @$update
    public set location(value: { localeId: number, x: number, y: number }) {
        this._localeId = value.localeId;
        this._x = value.x;
        this._y = value.y;
    }

    @$create
    public static create(): any { }

    public static load(data: any): Hero {
        return new Hero(data);
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