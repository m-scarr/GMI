import Battlefield from "./Battlefield";
import Cache from "./Cache";
import Enemy from "./Enemy";
import Event from "./Event";
import Group from "./Group";
import Hero from "./Hero";
import Locale from "./Locale";
import NPC from "./NPC";

export enum Category {
    Game,
    Hero,
    NPC,
    Enemy,
    Group,
    NativeItem,
    Cache,
    Battlefield,
    Locale,
    Event,

    GroupMember,
    InventoryItem,
    Stat,
    Combatant,
    Log
};

export const refData = {
    [Category.Hero]: { plural: "Heroes", singular: "Hero", color: "green", defaultMarkerSrc:"./assets/hero.png" },
    [Category.NPC]: { plural: "NPCs", singular: "NPC", color: "blue", defaultMarkerSrc:"./assets/npc.png" },
    [Category.Enemy]: { plural: "Enemies", singular: "Enemy", color: "red", defaultMarkerSrc:"./assets/enemy.png" },
    [Category.Group]: { plural: "Groups", singular: "Group", color: "darkorange", defaultMarkerSrc:"./assets/group.png" },
    [Category.NativeItem]: { plural: "Loot", singular: "Item", color: "gold", defaultMarkerSrc:"./assets/loot.png" },
    [Category.Cache]: { plural: "Caches", singular: "Cache", color: "saddlebrown", defaultMarkerSrc:"./assets/cache.png" },
    [Category.Battlefield]: { plural: "Battlefields", singular: "Battlefield", color: "maroon", defaultMarkerSrc:"./assets/battlefield.png" },
    [Category.Locale]: { plural: "Locales", singular: "Locale", color: "darkviolet", defaultMarkerSrc:"./assets/locale.png" },
    [Category.Event]: { plural: "Events", singular: "Event", color: "hotpink", defaultMarkerSrc:"./assets/event.png" }
};

export const IdCounter = {
    [Category.Game]: 0,
    [Category.Hero]: 0,
    [Category.NPC]: 0,
    [Category.Enemy]: 0,
    [Category.Group]: 0,
    [Category.NativeItem]: 0,
    [Category.Cache]: 0,
    [Category.Battlefield]: 0,
    [Category.Locale]: 0,
    [Category.Event]: 0,

    [Category.GroupMember]: 0,
    [Category.Combatant]: 0,
    [Category.InventoryItem]: 0,
    [Category.Stat]: 0,
    [Category.Log]: 0
};

export enum ModalType {
    OnlineSelector,
    LogIn,
    Register,
    ModeSelector,
    GameSelector,
    PlayerSelector,
    Item,
    Battlefield,
};

export type VisibleEntity = (Hero | NPC | Enemy | Group | Cache | Event | Battlefield | Locale);