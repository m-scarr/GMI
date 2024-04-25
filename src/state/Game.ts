import { makeAutoObservable, runInAction } from "mobx";
import { $create, $update, $delete } from "../API/connector";
//import Entity from "./Entity";
import Hero from "./Hero";
import { Category } from "./types";

export default class Game {
    private static _instance: Game | null = null;
    public static get instance(): Game | null {
        return this._instance;
    }
    public readonly category: Category = Category.Game;
    public readonly id!: number;
    private _name: string = "New Game";
    private _overworldId: number = -1;
    private _createdAt: string = "";
    private _updatedAt: string = "";
    private _userId: number = -1;

    public [Category.Hero]: { list: Hero[], add: Function, remove: Function } = {
        list: [],
        add: (newHero: Hero) => {
            runInAction(() => {
                this[Category.Hero].list.push(newHero);
            });
        },
        remove: (hero: Hero) => {
            runInAction(() => {
                const heroIndex = this[Category.Hero].list.indexOf(hero);
                if (heroIndex) {
                    this[Category.Hero].list.splice(heroIndex, 1);
                }
            });
        }
    }

    @$create
    public static create(): any { }

    public static load(data: any): Game { //this will load just the game row with no associations
        return new Game(data);
    }

    private constructor(data: any) {
        this.id = data.id;
        makeAutoObservable(this);
        runInAction(() => {
            Object.keys(data).forEach((key: string) => {
                if (`_${key}` in (this as any)) {
                    (this as any)[`_${key}`] = data[key];
                }
            });
        });
    }

    public open(): void { //this will load everything associated with this game

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