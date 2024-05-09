import { makeAutoObservable, runInAction } from "mobx";
import { $create, $update, $delete } from "../API/connector";
//import Entity from "./Entity";
import Hero from "./Hero";
import { Category, VisibleEntity } from "./types";
import Group from "./Group";
import Cache from "./Cache";
import Locale from "./Locale";
import Battlefield from "./Battlefield";
import NativeItem from "./NativeItem";
import EntityList from "./EntityList";
import NPC from "./NPC";
import Enemy from "./Enemy";
import Event from "./Event";
import Log from "./Log";
import InventoryItem from "./InventoryItem";
import Combatant from "./Combatant";
import GroupMember from "./GroupMember";
import Stat from "./Stat";
import AppState from "./AppState";
import API from "../API";
import Entity from "./Entity";

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

    private _overworldLocale: Locale | null = null;

    public [Category.Hero]: EntityList<Hero> = new EntityList<Hero>();
    public [Category.NPC]: EntityList<NPC> = new EntityList<NPC>();
    public [Category.Enemy]: EntityList<Enemy> = new EntityList<Enemy>();
    public [Category.Group]: EntityList<Group> = new EntityList<Group>();
    public [Category.NativeItem]: EntityList<NativeItem> = new EntityList<NativeItem>();
    public [Category.Cache]: EntityList<Cache> = new EntityList<Cache>();
    public [Category.Battlefield]: EntityList<Battlefield> = new EntityList<Battlefield>();
    public [Category.Locale]: EntityList<Locale> = new EntityList<Locale>();
    public [Category.Event]: EntityList<Event> = new EntityList<Event>();

    public [Category.Log]: EntityList<Log> = new EntityList<Log>();
    public [Category.InventoryItem]: EntityList<InventoryItem> = new EntityList<InventoryItem>();
    public [Category.Combatant]: EntityList<Combatant> = new EntityList<Combatant>();
    public [Category.GroupMember]: EntityList<GroupMember> = new EntityList<GroupMember>();
    public [Category.Stat]: EntityList<Stat> = new EntityList<Stat>();

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

    public async open() {
        Game._instance = this;
        const game = await API.read(Category.Game, this.id);
        game.locales.forEach((data: any) => {
            Entity[Category.Locale].load(data);
            if (data.id===this._overworldId) {
                this._overworldLocale = this[Category.Locale].list[this[Category.Locale].list.length - 1]
            }
        });
        game.nativeItems.forEach((data: any) => {
            Entity[Category.NativeItem].load(data);
        });
        game.characters.forEach((data: any) => {
            (Entity as any)[(Category as any)[data.category]].load(data);
        });
        game.caches.forEach((data: any) => {
            Entity[Category.Cache].load(data);
        });
        game.groups.forEach((data: any) => {
            Entity[Category.Group].load(data);
        });
        game.battlefields.forEach((data: any) => {
            Entity[Category.Battlefield].load(data);
        });
        game.events.forEach((data: any) => {
            Entity[Category.Event].load(data);
        });
        AppState.instance.currentLocale = this._overworldLocale;
        AppState.instance.currentModal = null;
    }

    public get name(): string {
        return this._name;
    }

    public get overworldLocale() {
        return this._overworldLocale
    }

    public findEntity(category: Category, id: number) {
        (this as any)[category].list.forEach((entity: any) => {
            if (entity.id === id) {
                return entity;
            }
        });
        return null;
    }

    public findCharacter(id: number) {
        [...(this as any)[Category.Hero].list, ...(this as any)[Category.NPC].list, ...(this as any)[Category.Enemy].list].forEach((entity: any) => {
            if (entity.id === id) {
                return entity;
            }
        });
        return null;
    }

    @$update
    public set name(value: string) {
        this._name = value;
    }

    @$delete
    public delete() {

    }
}