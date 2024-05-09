import Battlefield from "./Battlefield";
import Cache from "./Cache";
import Event from "./Event";
import Group from "./Group";
import Hero from "./Hero";
import Locale from "./Locale";

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

export const stringifier = {
    [Category.Hero]: { plural: "Heroes", singular: "Hero" },
    [Category.NPC]: { plural: "NPCs", singular: "NPC" },
    [Category.Enemy]: { plural: "Enemies", singular: "Enemy" },
    [Category.Group]: { plural: "Groups", singular: "Group" },
    [Category.NativeItem]: { plural: "Loot", singular: "Item" },
    [Category.Cache]: { plural: "Caches", singular: "Cache" },
    [Category.Battlefield]: { plural: "Battlefields", singular: "Battlefield" },
    [Category.Locale]: { plural: "Locales", singular: "Locale" },
    [Category.Event]: { plural: "Events", singular: "Event" }
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

export type VisibleEntity = (Hero | Group | Cache | Event | Battlefield | Locale);