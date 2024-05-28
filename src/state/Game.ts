import { makeAutoObservable, runInAction, toJS } from "mobx";
import { $create, $update, $delete } from "../API/connector";
//import Entity from "./Entity";
import Hero from "./Hero";
import { Category, ModalType, VisibleEntity } from "./types";
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

    public clear() {
        this[Category.Hero].clear();
        this[Category.NPC].clear();
        this[Category.Enemy].clear();
        this[Category.Group].clear();
        this[Category.NativeItem].clear();
        this[Category.Cache].clear();
        this[Category.Battlefield].clear();
        this[Category.Locale].clear();
        this[Category.Event].clear();
        this[Category.Log].clear();
        this[Category.InventoryItem].clear();
        this[Category.Combatant].clear();
        this[Category.GroupMember].clear();
        this[Category.Stat].clear();
    }

    public async refresh() {
        const snapshot = AppState.instance.save();
        let selectedPlayerCharacterId;
        if (!AppState.instance.gameMasterMode) {
            selectedPlayerCharacterId = AppState.instance.selectedPlayerCharacter!.id;
        }
        AppState.instance.clear();

        this.clear();
        if (AppState.instance.gameMasterMode) {
            await this.open();
        } else {
            await Game.openPlayerCharacter(await API.read(Category.Hero, selectedPlayerCharacterId!));
        }
        AppState.instance.restore(snapshot);
        if (!AppState.instance.gameMasterMode && Game.instance![Category.Locale].list.length > 0) {
            AppState.instance.currentLocale = Game.instance![Category.Locale].list[0];
        }
    }

    @$create
    public static create(): any { }

    public static load(data: any): Game { //this will load just the game row with no associations
        return new Game(data);
    }

    private constructor(data: any) {
        if (data) {
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
    }

    public async open() {
        Game._instance = this;
        AppState.instance.selectedPlayerCharacter = null;
        const game = await API.read(Category.Game, this.id);
        runInAction(() => {
            this._name = game.name;
            this._createdAt = game.createdAt;
            this._updatedAt = game.updatedAt;
            this._overworldId = game.overworldId;
        });
        game.locales.forEach((data: any) => {
            Entity[Category.Locale].load(data);
            if (data.id === this._overworldId) {
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

    public static async openPlayerCharacter(game: any) {
        const newGame = Game.load({ id: game.character.gameId });
        Game._instance = newGame;
        if (game.locale !== null) {
            Entity[Category.Locale].load(game.locale);
        }
        game.nativeItems.forEach((data: any) => {
            Entity[Category.NativeItem].load(data);
        });
        game.groups.forEach((data: any) => {
            Entity[Category.Group].load(data);
        });
        Entity[Category.Hero].load(game.character);
        AppState.instance.selectedPlayerCharacter = Game.instance![Category.Hero].list[0];
        AppState.instance.currentEntity = AppState.instance.selectedPlayerCharacter;
        game.battlefields.forEach((data: any) => {
            Entity[Category.Battlefield].load(data);
        });
        if (!AppState.instance.gameMasterMode && Game.instance![Category.Locale].list.length > 0) {
            AppState.instance.currentLocale = Game.instance![Category.Locale].list[0];
        }
        AppState.instance.currentModal = null;
    }

    public get name(): string {
        return this._name;
    }

    public get overworldLocale() {
        return this._overworldLocale
    }

    public findEntity(category: Category, id: number) {
        for (let i = 0; i < (this as any)[category].list.length; i++) {
            const entity = (this as any)[category].list[i];
            if (entity.id == id) {
                return entity;
            }
        }
        return null;
    }

    public findCharacter(id: number) {
        const list = [...(this as any)[Category.Hero].list, ...(this as any)[Category.NPC].list, ...(this as any)[Category.Enemy].list];
        for (let i = 0; i < list.length; i++) {
            const entity = list[i];
            if (entity.id == id) {
                return entity;
            }
        }
        return null;
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
        AppState.instance.clear();
        Game.instance!.clear();
        AppState.instance.currentModal = ModalType.GameSelector;
    }
}