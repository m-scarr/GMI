import { makeAutoObservable, runInAction } from "mobx";
import { Category, ModalType, VisibleEntity } from "./types";
import Locale from "./Locale";
import Hero from "./Hero";
import API from "../API";
import Game from "./Game";
export default class AppState {
    public static readonly instance = new AppState();
    private _user: any = null;
    private _gameMasterMode: boolean = true;
    private _onlineMode: boolean = true;
    private _currentCategory: Category | null = null;
    private _currentEntity: any = null;
    private _currentModal: ModalType | null = ModalType.LogIn;
    private _currentLocale: Locale | null = null;
    private _droppingMarker: VisibleEntity | null = null;
    private _loading: boolean = false;
    private _showMenu: boolean = false;
    private _serverAccess: boolean = false;
    private _selectedPlayerCharacter: Hero | null = null;
    private _modals: any = {
        item: { id: null, content: null },
        battlefield: { id: null, content: null },
        games: [],
        playerCharacters: []
    };

    private constructor() {
        makeAutoObservable(this);
        this.initialize();
    }

    private async initialize() {
        const result = await API.init();
        this.user = result.user;
        this._serverAccess = result.serverAccess;
    }

    public async logIn(logInName: string, password: string) {
        this.user = await API.user.logIn(logInName, password);
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
        if (modalType === ModalType.GameSelector || modalType === ModalType.PlayerSelector) {
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
            this._modals.playerCharacters = result;
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
}