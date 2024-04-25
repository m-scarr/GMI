import { makeAutoObservable } from "mobx";
import { Category, ModalType } from "./types";
import Hero from "./Hero";
export default class AppState {
    public static readonly instance = new AppState();
    private _user: any = null;
    private _gameMasterMode: boolean = true;
    private _currentCategory: Category | null = null;
    private _currentEntity: any = null;
    private _currentModal: ModalType | null = ModalType.Register;
    //private _currentLocale: Locale | null = null;
    //private _droppingMarker: VisibleEntity | null = null;
    private _loading: boolean = false;
    private _showMenu: boolean = false;
    private _serverAccess: boolean = false;
    private _selectedPlayerCharacter: Hero | null = null;
    private _modals: any = {
        item: null,
        battlefield: null,
      };
    
    private constructor() {
        makeAutoObservable(this);
    }

    public get currentModal():ModalType|null {
        return this._currentModal
    }
    public set currentModal(modalType:ModalType | null) {
        this._currentModal = modalType;
    }
}