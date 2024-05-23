import { $create, $delete, $update } from "../API/connector";
import AppState from "./AppState";
import Entity from "./Entity";
import EntityList from "./EntityList";
import Game from "./Game";
import Log from "./Log";
import { Category } from "./types";

export default class Locale {
    public readonly category: Category = Category.Locale;
    public readonly id!: number;
    private _name: string = "";
    private _localeId: number | null = null;
    private _x: number | null = null;
    private _y: number | null = null;
    private _visible: boolean = true;
    private _markerSrc: string = "./assets/locale.png";
    private _mapSrc: string = "./assets/noimage.png";

    private _map: HTMLImageElement = new Image();
    private _marker: HTMLImageElement = new Image();

    public logs: EntityList<Log> = new EntityList<Log>();

    @$create
    public static create(): any { }

    public static load(data: any): Locale {
        return new Locale(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
        this._map.src = this._mapSrc;
        this._marker.src = this._markerSrc;

    }

    public get name(): string {
        return this._name;
    }

    public get marker() {
        return this._marker;
    }

    public get markerSrc() {
        return this._markerSrc;
    }

    @$update
    public set markerSrc(value: string) {
        this._markerSrc = value;
        this._marker.src = value;
    }

    public get visible() {
        return this._visible;
    }

    @$update
    public set visible(newVal: boolean) {
        this._visible = newVal;
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

    public get map() {
        return this._map;
    }

    public get mapSrc() {
        return this._mapSrc;
    }
    
    @$update
    public set mapSrc(value: string) {
        this._mapSrc = value;
        this._map.src = value;
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
        while (this.logs.list.length > 0) {
            this.logs.list[0].forceDelete();
        }
        AppState.instance.currentEntity = null;
        (Game.instance as any)[this.category].remove(this);
    }
}