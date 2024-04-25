import { $create, $delete, $update } from "../API/connector";
import Battlefield from "./Battlefield";
import Entity from "./Entity";
import Hero from "./Hero";
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

    private _character: Hero | null = null;
    private _battlefield: Battlefield | null = null;

    @$create
    public static create(_characterId: number, _battlefieldId: number, _ally: boolean): any { }

    public static load(data: any): Combatant {
        return new Combatant(data);
    }

    private constructor(data: any) {
        Entity.build(this, data);
    }

    @$delete
    public delete() {

    }
}