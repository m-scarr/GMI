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
}

export const pluralizer = {
    [Category.Hero]: "Heroes",
    [Category.NPC]: "NPCs",
    [Category.Enemy]: "Enemies",
    [Category.Group]: "Groups",
    [Category.NativeItem]: "Loot",
    [Category.Cache]: "Caches",
    [Category.Battlefield]: "Battlefields",
    [Category.Locale]: "Locales",
    [Category.Event]: "Events"
}

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
}

export enum ModalType {
    LogIn,
    Register
}