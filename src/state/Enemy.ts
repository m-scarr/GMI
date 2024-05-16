import { $create, $delete, $update } from "../API/connector";
import Combatant from "./Combatant";
import Entity from "./Entity";
import EntityList from "./EntityList";
import Game from "./Game";
import GroupMember from "./GroupMember";
import InventoryItem from "./InventoryItem";
import Log from "./Log";
import { Category } from "./types";

export default class Enemy {
    public readonly category: Category = Category.Enemy;
    public readonly id!: number;
    private _name: string = "New Enemy";
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

    public groupMembers: EntityList<GroupMember> = new EntityList<GroupMember>();
    public combatants: EntityList<Combatant> = new EntityList<Combatant>();
    public inventoryItems: EntityList<InventoryItem> = new EntityList<InventoryItem>();
    public logs: EntityList<Log> = new EntityList<Log>();

    public _marker: HTMLImageElement = new Image();

    @$create
    public static create(): any { }

    public static load(data: any): Enemy {
        return new Enemy(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
        this._marker.src = this._markerSrc;
    }

    public get marker() {
        return this._marker;
    }

    public get name(): string {
        return this._name;
    }

    @$update
    public set name(value: string) {
        this._name = value;
    }

    public get location(): { localeId: number | null, x: number | null, y: number | null } {
        return { localeId: this._localeId, x: this._x, y: this._y }
    }

    @$update
    public set location(value: { localeId: number, x: number, y: number }) {
        this._localeId = value.localeId;
        this._x = value.x;
        this._y = value.y;
    }

    public get unique(): boolean {
        return this._unique;
    }

    @$update
    public set unique(value: boolean) {
        while (this.groupMembers.list.length > 0) {
            this.groupMembers.list[0].forceDelete();
        }
        //destroy combatants
        while (this.inventoryItems.list.length > 0) {
            this.inventoryItems.list[0].forceDelete();
        }
        this._unique = value;
    }

    public get visible(): boolean {
        return this._visible;
    }

    @$update
    public set visible(value: boolean) {
        this._visible = value;
    }

    public get hp(): number {
        return this._hp;
    }

    @$update
    public set hp(value: number) {
        this._hp = value;
    }

    public get maxHp(): number {
        return this._maxHp;
    }

    @$update
    public set maxHp(value: number) {
        this._maxHp = value;
    }

    public get playerWritePermission(): boolean {
        return this._playerWritePermission;
    }

    @$update
    public set playerWritePermission(value: boolean) {
        this._playerWritePermission = value;
    }

    public get playerUserId(): number | null {
        return this._playerUserId;
    }

    @$update
    public set playerUserId(value: number | null) {
        this._playerUserId = value;
    }

    public get markerSrc(): string {
        return this._markerSrc;
    }

    @$update
    public set markerSrc(value: string) {
        this._markerSrc = value;
        this._marker.src = value;
    }


    @$delete
    public delete() {
        this.forceDelete();
    }

    public forceDelete() {
        while (this.groupMembers.list.length > 0) {
            this.groupMembers.list[0].forceDelete();
        }
        while (this.inventoryItems.list.length > 0) {
            this.inventoryItems.list[0].forceDelete();
        }
        while (this.combatants.list.length > 0) {
            this.combatants.list[0].forceDelete();
        }
        while (this.logs.list.length > 0) {
            this.logs.list[0].forceDelete();
        }
        (Game.instance as any)[this.category].remove(this);
    }
}