import { $create, $delete, $update } from "../API/connector";
import AppState from "./AppState";
import Battlefield from "./Battlefield";
import Enemy from "./Enemy";
import Entity from "./Entity";
import Game from "./Game";
import Hero from "./Hero";
import NPC from "./NPC";
import { Category } from "./types";

export default class Combatant {
    public readonly category: Category = Category.Combatant;
    public readonly id!: number;
    private _characterId: number | null = null;
    private _battlefieldId: number | null = null;
    private _x: number | null = null;
    private _y: number | null = null;
    private _hp: number = 10;
    private _visible: boolean = true;
    private _ally: boolean = true;
    private _scale: number = 48;

    private _createdAt: string = "";
    private _updatedAt: string = "";

    private _character: Hero | NPC | Enemy | null = null;
    private _battlefield: Battlefield | null = null;

    @$create
    public static create(_characterId: number, _battlefieldId: number, _ally: boolean): any { }

    public static load(data: any): Combatant {
        return new Combatant(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
        this._character = Game.instance!.findCharacter(this._characterId!);
        this._battlefield = Game.instance!.findEntity(Category.Battlefield, this._battlefieldId!);
        this._character!.combatants.add(this);
        this._battlefield!.combatants.add(this);
    }

    public get character() {
        return this._character;
    }

    public get battlefield() {
        return this._battlefield;
    }

    @$delete
    public delete() {
        this.forceDelete();
    }

    public forceDelete() {
        this._battlefield!.combatants.remove(this);
        this._character!.combatants.remove(this);
        AppState.instance.currentEntity = null;
        (Game.instance as any)[this.category].remove(this);
    }
}