import { makeAutoObservable, runInAction } from "mobx";
import { Category, ModalType, VisibleEntity } from "./types";
import Locale from "./Locale";
import Hero from "./Hero";
import API from "../API";
import Game from "./Game";
import NativeItem from "./NativeItem";
import InputManager from "./InputManager";

export async function wait(ms: number) {
    return new Promise<void>(resolve => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            resolve();
        }, ms);
    });
}

export async function checkImageSrc(source: string) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => {
            alert("There is no image at this location!");
            resolve(false);
        }
        img.src = source;
    });
}

export default class AppState {
    public static readonly instance = new AppState();
    public readonly menuWidth = 320;
    private _user: any = null;
    private _gameMasterMode: boolean = true;
    private _onlineMode: boolean = true;
    private _currentCategory: Category | null = null;
    private _currentEntity: any = null;
    private _goToEntity: any = null;
    private _currentModal: ModalType | null = ModalType.LogIn;
    private _currentLocale: Locale | null = null;
    private _droppingMarker: VisibleEntity | null = null;
    private _loading: boolean = false;
    private _showMenu: boolean = false;
    private _serverAccess: boolean = false;
    private _selectedPlayerCharacter: Hero | null = null;
    private _tick: boolean = false;
    private _tickInterval: NodeJS.Timeout = setInterval(async () => {
        InputManager.decrementTimers(16);
        runInAction(() => {
            this._tick = !this.tick;
            if (this._goToEntity !== null) {
                this._goToEntity = null
            }
        });
    }, 16);
    private _searchValue: string = "";
    private _modals: any = {
        item: { content: null, equipped: false },
        battlefield: { content: null },
        games: [],
        playerCharacters: [],
        iconSelector: {
            iconType: "accessory",
            icons: {
                accessory: { name: "Accessories", sources: [] },
                armor: { name: "Armor", sources: [] },
                boot: { name: "Boots", sources: [] },
                drops: { name: "Drops", sources: [] },
                food: { name: "Food", sources: [] },
                glove: { name: "Gloves", sources: [] },
                helmet: { name: "Helms", sources: [] },
                material: { name: "Materials", sources: [] },
                potion: { name: "Potions", sources: [] },
                quest: { name: "Various", sources: [] },
                ring: { name: "Rings", sources: [] },
                weapon: { name: "Weapons", sources: [] },
                shield: { name: "Shields", sources: [] },
            },
        },
    };

    public setModalData(modalType: string, fields: string[], data: any) {
        if (fields.length === 1) {
            this._modals[modalType][fields[0]] = data;
        } else if (fields.length === 2) {
            this._modals[modalType][fields[0]][fields[1]] = data;
        } else if (fields.length === 3) {
            this._modals[modalType][fields[0]][fields[1]][fields[2]] = data;
        }
    }

    private constructor() {
        makeAutoObservable(this);
        this.initialize();
    }

    private async initialize() {
        const result = await API.init();
        this.user = result.user;
        this._serverAccess = result.serverAccess;
        this.setIconSources();
    }

    public save() {
        return {
            _currentCategory: this._currentCategory,
            _currentEntity: this.currentEntity ? { category: this._currentEntity.category, id: this._currentEntity.id } : null,
            _currentModal: this._currentModal,
            _currentLocale: this._currentLocale ? this._currentLocale.id : null,
            _selectedPlayerCharacter: this._selectedPlayerCharacter ? this._selectedPlayerCharacter.id : null,
            _modals: {
                item: { content: this._modals.item.content ? this._modals.item.content.id : null, equipped: this._modals.item.equipped },
                battlefield: { content: this._modals.battlefield.content ? this._modals.battlefield.content.id : null }
            },
            _showMenu: this._showMenu
        }
    }

    public clear() {
        this._currentEntity = null;
        this._currentCategory = null;
        this._goToEntity = null;
        this._currentModal = null;
        this._currentLocale = null;
        this._droppingMarker = null;
        this._selectedPlayerCharacter = null;
        this._modals.item.content = null;
        this._modals.item.equipped = false;
        this._modals.battlefield.content = null;
        this._showMenu = false;
    }

    public restore(data: any) {
        this._currentCategory = data._currentCategory;
        this._currentEntity = data._currentEntity ? Game.instance!.findEntity(data._currentEntity.category, data._currentEntity.id) : null;
        this._currentModal = data._currentModal;
        this._currentLocale = data._currentLocale ? Game.instance!.findEntity(Category.Locale, data._currentLocale) : null;
        this._selectedPlayerCharacter = data._selectedPlayerCharacter ? Game.instance!.findCharacter(data._selectedPlayerCharacter) : null;
        this._modals.item.content = data._modals.item.content ? Game.instance!.findEntity(Category.NativeItem, data._modals.item.content) : null;
        this._modals.item.equipped = data._modals.item.equipped;
        this._modals.battlefield.content = data._modals.battlefield.content ? Game.instance!.findEntity(Category.Battlefield, data._modals.battlefield.content) : null;
        this._showMenu = data._showMenu;
    }

    public async logIn(logInName: string, password: string) {
        this.user = await API.user.logIn(logInName, password);
    }

    public set selectedPlayerCharacter(value: Hero | null) {
        this._selectedPlayerCharacter = value;
    }

    public get loading() {
        return this._loading;
    }

    public set loading(value: boolean) {
        this._loading = value;
    }

    public get selectedPlayerCharacter() {
        return this._selectedPlayerCharacter;
    }

    public get tick() {
        return this._tick;
    }

    public get gameMasterMode() {
        return this._gameMasterMode;
    }

    public set gameMasterMode(newVal: boolean) {
        this._gameMasterMode = newVal;
    }

    public set searchValue(newVal: any) {
        this._searchValue = newVal;
    }

    public get searchValue() {
        return this._searchValue;
    }

    public get currentCategory(): Category | null {
        return this._currentCategory;
    }

    public set currentCategory(newVal: Category | null) {
        this._currentEntity = null;
        this._searchValue = "";
        this._currentCategory = newVal;
    }

    public get serverAccess() {
        return this._serverAccess;
    }

    public set showMenu(newVal: boolean) {
        this._showMenu = newVal;
    }

    public get showMenu() {
        return this._showMenu;
    }

    public get droppingMarker(): VisibleEntity | null {
        return this._droppingMarker;
    }

    public set droppingMarker(newVal: VisibleEntity | null) {
        this._droppingMarker = newVal;
    }

    public set currentEntity(newVal: VisibleEntity | NativeItem | null) {
        if (newVal !== null) {
            this._currentCategory = newVal.category;
        }
        this._currentEntity = newVal;
    }


    public get currentEntity() {
        return this._selectedPlayerCharacter === null ? this._currentEntity : this.selectedPlayerCharacter;
    }

    public set goToEntity(newVal: any) {
        this._goToEntity = newVal;
    }

    public get goToEntity() {
        return this._goToEntity;
    }

    public get currentModal(): ModalType | null {
        return this._currentModal
    }

    public set currentModal(modalType: ModalType | null) {
        if (this._user !== null && (modalType === ModalType.LogIn || modalType === ModalType.Register)) {
            this._currentModal = ModalType.ModeSelector;
        } else {
            this._currentModal = modalType;
        }
        if (modalType === ModalType.GameSelector || modalType === ModalType.PlayerCharacterSelector) {
            this.readByUser(modalType === ModalType.GameSelector ? Category.Game : Category.Hero)
        }
    }

    private async readByUser(category: Category.Game | Category.Hero) {
        const result = await API.readByUser(category);
        if (category === Category.Game) {
            runInAction(() => {
                this._modals.games = [];
                result.forEach((game: any) => {
                    this._modals.games.push(Game.load(game));
                });
            });
        } else {
            runInAction(() => {
                this._modals.playerCharacters = result;
            });
        }
    }

    private set user(value: any) {
        this._user = value;
        if (value !== null && (this._currentModal == ModalType.LogIn || this._currentModal == ModalType.Register)) {
            this._currentModal = ModalType.ModeSelector
        }
    }

    public get user() {
        return this._user;
    }

    public get modals(): any {
        return { ...this._modals };
    }

    public set currentLocale(newVal: Locale | null) {
        this._currentLocale = newVal;
    }

    public get currentLocale(): Locale | null {
        return this._currentLocale;
    }

    private setIconSources() {
        var i;
        var weaponRefObj = [
            { name: "arrow", count: 20 },
            { name: "axe", count: 30 },
            { name: "bow", count: 30 },
            { name: "claw", count: 30 },
            { name: "dagger", count: 36 },
            { name: "katar", count: 20 },
            { name: "mace", count: 36 },
            { name: "spear", count: 20 },
            { name: "staff", count: 30 },
            { name: "star", count: 20 },
            { name: "sword", count: 36 },
            { name: "wand", count: 30 },
        ];
        for (i = 1; i <= 56; i++) {
            this._modals.iconSelector.icons.accessory.sources.push("./assets/icons/accessory/accessory_" + (i < 10 ? "0" : "") + i + ".png");
        }
        for (i = 1; i <= 108; i++) {
            this._modals.iconSelector.icons.armor.sources.push(
                "./assets/icons/armor/armor_" + (i < 10 ? "0" : "") + (i < 100 ? "0" : "") + i + ".png"
            );
        }
        for (i = 1; i <= 29; i++) {
            this._modals.iconSelector.icons.boot.sources.push("./assets/icons/boot/boot_" + (i < 10 ? "0" : "") + i + ".png");
        }
        for (i = 1; i <= 64; i++) {
            this._modals.iconSelector.icons.drops.sources.push("./assets/icons/drops/drops_" + (i < 10 ? "0" : "") + i + ".png");
        }
        for (i = 1; i <= 72; i++) {
            this._modals.iconSelector.icons.food.sources.push("./assets/icons/food/food_" + (i < 10 ? "0" : "") + i + ".png");
        }
        for (i = 1; i <= 41; i++) {
            this._modals.iconSelector.icons.glove.sources.push("./assets/icons/glove/glove_" + (i < 10 ? "0" : "") + i + ".png");
        }
        for (i = 1; i <= 72; i++) {
            this._modals.iconSelector.icons.helmet.sources.push("./assets/icons/helmet/helmet_" + (i < 10 ? "0" : "") + i + ".png");
        }
        for (i = 1; i <= 100; i++) {
            this._modals.iconSelector.icons.material.sources.push("./assets/icons/material/material_" + (i < 10 ? "0" : "") + i + ".png");
        }
        for (i = 1; i <= 224; i++) {
            this.modals.iconSelector.icons.potion.sources.push("./assets/icons/potion/potion_" + (i < 10 ? "0" : "") + i + ".png");
        }
        for (i = 1; i <= 216; i++) {
            this.modals.iconSelector.icons.quest.sources.push(
                "./assets/icons/quest/quest_" + (i < 10 ? "0" : "") + (i < 100 ? "0" : "") + i + ".png"
            );
        }
        for (i = 1; i <= 106; i++) {
            this._modals.iconSelector.icons.ring.sources.push(
                "./assets/icons/ring/ring_" + (i < 10 ? "0" : "") + (i < 100 ? "0" : "") + i + ".png"
            );
        }
        for (i = 1; i <= 43; i++) {
            this._modals.iconSelector.icons.shield.sources.push("./assets/icons/shield/shield_" + (i < 10 ? "0" : "") + i + ".png");
        }
        var j;
        for (i = 0; i < weaponRefObj.length; i++) {
            for (j = 1; j < weaponRefObj[i].count; j++) {
                this._modals.iconSelector.icons.weapon.sources.push(
                    "./assets/icons/weapon/weapon_" + weaponRefObj[i].name + "_" + ((j < 10 ? "0" : "") + j) + ".png"
                );
            }
        }
    }
}