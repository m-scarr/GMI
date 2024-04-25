import { $create, $delete, $update } from "../API/connector";
import Combatant from "./Combatant";
import Entity from "./Entity";
import Log from "./Log";
import { Category } from "./types";

export default class Battlefield {
    public readonly category: Category = Category.Battlefield;
    public readonly id!: number;
    private _name: string = "";
    private _localeId: number | null = null;
    private _x: number | null = null;
    private _y: number | null = null;
    private _visible: boolean = true;
    private _scale: number = 96;
    private _mapSrc: string = "./assets/noimage.png";
    private _markerSrc: string = "./assets/battlefield.png";
    private _notes: string = "";
    private _createdAt: string = "";
    private _updatedAt: string = "";

    private _combatants: Combatant[] = [];
    private _logs: Log[] = [];

    @$create
    public static create(): any { }

    public static load(data: any): Battlefield {
        return new Battlefield(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
    }

    public get name(): string {
        return this._name;
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