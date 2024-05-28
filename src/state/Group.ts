import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import Hero from "./Hero";
import Enemy from "./Enemy";
import Log from "./Log";
import NPC from "./NPC";
import { Category } from "./types";
import EntityList from "./EntityList";
import GroupMember from "./GroupMember";
import Game from "./Game";
import AppState from "./AppState";

export default class Group {
    public readonly category: Category = Category.Group;
    public readonly id!: number;
    private _name: string = "";
    private _localeId: number | null = null;
    private _x: number | null = null;
    private _y: number | null = null;
    private _visible: boolean = true;
    private _markerSrc: string = "./assets/event.png";
    private _notes: string = "";

    private _marker: HTMLImageElement = new Image();
    public groupMembers: EntityList<GroupMember> = new EntityList<GroupMember>();
    public logs: EntityList<Log> = new EntityList<Log>();

    @$create
    public static create(): any { }

    public static load(data: any): Group {
        return new Group(data);
    }

    private constructor(data: any) {
        if (data) {
            Entity.build(this, data);
            this._marker.src = this._markerSrc;
        }
    }

    public get marker() {
        return this._marker;
    }

    public get visible() {
        return this._visible;
    }

    public get name(): string {
        return this._name;
    }

    @$update
    public set visible(newVal: boolean) {
        this._visible = newVal;
    }

    public get notes(): string {
        return this._notes;
    }

    @$update
    public set notes(newVal: string) {
        this._notes = newVal;
    }

    public get location(): { localeId: number | null, x: number | null, y: number | null } {
        return { localeId: this._localeId, x: this._x, y: this._y }
    }

    public get markerSrc(): string {
        return this._markerSrc;
    }

    @$update
    public set markerSrc(value: string) {
        this._markerSrc = value;
        this._marker.src = value;
    }


    @$update
    public set location(value: { localeId: number, x: number, y: number }) {
        this._localeId = value.localeId;
        this._x = value.x;
        this._y = value.y;
    }

    @$update
    public set name(value: string) {
        this._name = value;
    }

    @$delete
    public delete() {
        this.forceDelete();
    }

    public forceDelete() {
        while (this.groupMembers.list.length > 0) {
            this.groupMembers.list[0].forceDelete();
        }
        while (this.logs.list.length > 0) {
            this.logs.list[0].forceDelete();
        }
        AppState.instance.currentEntity = null;
        (Game.instance as any)[this.category].remove(this);
    }
}