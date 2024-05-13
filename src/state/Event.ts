import { $create, $delete, $update } from "../API/connector";
import Entity from "./Entity";
import EntityList from "./EntityList";
import Log from "./Log";
import { Category } from "./types";

export default class Event {
    public readonly category: Category = Category.Event;
    public readonly id!: number;
    private _name: string = "";
    private _localeId: number | null = null;
    private _x: number | null = null;
    private _y: number | null = null;
    private _visible: boolean = true;
    private _markerSrc: string = "./assets/event.png";

    public logs: EntityList<Log> = new EntityList<Log>();

    public _marker: HTMLImageElement = new Image();

    @$create
    public static create(): any { }

    public static load(data: any): Event {
        return new Event(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
        this._marker.src = this._markerSrc;
    }

    public get marker() {
        return this._marker;
    }

    public get visible() {
        return this._visible;
    }
        
    @$update
    public set visible(newVal: boolean) {
        this._visible = newVal;
    }
    
    public get name(): string {
        return this._name;
    }

    public get markerSrc(): string {
        return this._markerSrc;
    }

    @$update
    public set markerSrc(value: string) {
        this._markerSrc = value;
        this._marker.src = value;
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

    @$update
    public set name(value: string) {
        this._name = value;
    }

    @$delete
    public delete() {

    }
}