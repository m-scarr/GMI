import { makeAutoObservable, runInAction, toJS } from "mobx";
import Game from "./Game";
import { Category, VisibleEntity } from "./types";
import Locale from "./Locale";
import Log from "./Log";
import Hero from "./Hero";
import InventoryItem from "./InventoryItem";
import NativeItem from "./NativeItem";
import Stat from "./Stat";
import NPC from "./NPC";
import Enemy from "./Enemy";
import Cache from "./Cache";
import Group from "./Group";
import GroupMember from "./GroupMember";
import Event from "./Event";
import Battlefield from "./Battlefield";
import Combatant from "./Combatant";
import AppState from "./AppState";

export default abstract class Entity {
    static create(category: Category) {
        if (category == Category.Hero) {
            Hero.create();
        } else if (category == Category.NPC) {
            NPC.create();
        } else if (category == Category.Enemy) {
            Enemy.create();
        } else if (category == Category.Group) {
            Group.create();
        } else if (category == Category.NativeItem) {
            NativeItem.create();
        } else if (category == Category.Cache) {
            Cache.create();
        } else if (category == Category.Battlefield) {
            Battlefield.create();
        } else if (category == Category.Locale) {
            Locale.create();
        } else if (category == Category.Event) {
            Event.create();
        } else {
            console.warn("not yet surpported for create");
        }
    }

    static build(entity: any, data: any) {
        makeAutoObservable(entity);
        runInAction(() => {
            entity.id = data.id;
            Object.keys(data).forEach((key: string) => {
                if (`_${key}` in entity) {
                    (entity as any)[`_${key}`] = data[key];
                }
            });
            if (typeof entity._ownerCategory !== "undefined") {
                if (data.ownerCategory === "Character") {
                    entity._ownerCategory = Game.instance?.findCharacter(data.ownerId).category;
                } else {
                    entity._ownerCategory = Category[entity._ownerCategory];
                }
            }
        });
        (Game.instance as any)[entity.category].add(entity);
    }

    public static hasItem(owner: Hero | NPC | Enemy | Cache, item: NativeItem) {
        const inventoryItems = owner.inventoryItems.list;
        for (let i = 0; i < inventoryItems.length; i++) {
            if (item.id === inventoryItems[i].nativeItem!.id) {
                return true;
            }
        }
        return false;
    }

    public static hasMember(group: Group, member: Hero | NPC | Enemy | Cache) {
        const members = [...group.groupMembers.list];
        for (let i = 0; i < members.length; i++) {
            if (member.id === members[i].character!.id) {
                return true;
            }
        }
        return false;
    }

    public static [Category.Locale]: any = {
        load: (data: any) => {
            Locale.load(data);
            if (typeof data.logs !== "undefined") {
                data.logs.forEach((log: any) => {
                    Log.load(log);
                });
            }
        }
    }

    public static [Category.NativeItem]: any = {
        load: (data: any) => {
            NativeItem.load(data);
            if (typeof data.logs !== "undefined") {
                data.logs.forEach((log: any) => {
                    Log.load(log);
                });
            }
            data.stats.forEach((stat: any) => {
                Stat.load(stat);
            })
        }
    }

    public static [Category.Hero]: any = {
        load: (data: any) => {
            Hero.load(data);
            data.logs.forEach((log: any) => {
                Log.load(log);
            });
            data.inventoryItems.forEach((inventoryItem: any) => {
                InventoryItem.load(inventoryItem);
            });

            //This is for player's interface
            if (typeof data.groupMembers !== "undefined" && data.groupMembers.length > 0) {
                //Group.load(data.groupMembers[0].group);
                GroupMember.load(data.groupMembers[0]);
            }
        }
    }

    public static [Category.NPC]: any = {
        load: (data: any) => {
            NPC.load(data);
            data.logs.forEach((log: any) => {
                Log.load(log);
            });
            data.inventoryItems.forEach((inventoryItem: any) => {
                InventoryItem.load(inventoryItem);
            });
        }
    }

    public static [Category.Enemy]: any = {
        load: (data: any) => {
            Enemy.load(data);
            data.logs.forEach((log: any) => {
                Log.load(log);
            });
            data.inventoryItems.forEach((inventoryItem: any) => {
                InventoryItem.load(inventoryItem);
            });
        }
    }

    public static [Category.Cache]: any = {
        load: (data: any) => {
            Cache.load(data);
            data.logs.forEach((log: any) => {
                Log.load(log);
            });
            data.inventoryItems.forEach((inventoryItem: any) => {
                InventoryItem.load(inventoryItem);
            })
        }
    }

    public static [Category.Group]: any = {
        load: (data: any) => {
            Group.load(data);
            if (typeof data.logs !== "undefined") {
                data.logs.forEach((log: any) => {
                    Log.load(log);
                });
            }
            if (typeof data.groupMembers !== "undefined") {
                data.groupMembers.forEach((groupMember: any) => {
                    GroupMember.load(groupMember);
                });
            }
        }
    }

    public static [Category.Battlefield]: any = {
        load: (data: any) => {
            Battlefield.load(data);
            data.logs.forEach((log: any) => {
                Log.load(log);
            });
            data.combatants.forEach((combatant: any) => {
                Combatant.load(combatant);
                if (typeof combatant.character !== "undefined") {
                    if (combatant.character.category === "Hero") {
                        Hero.load(combatant.character);
                    } else if (combatant.character.category === "NPC") {
                        NPC.load(combatant.character);
                    } else {
                        Enemy.load(combatant.character);
                    }
                }
            });
            // make changes for player's interface
        }
    }

    public static [Category.Event]: any = {
        load: (data: any) => {
            Event.load(data);
            data.logs.forEach((log: any) => {
                Log.load(log);
            });
        }
    }

    public static isVisible(entity: VisibleEntity) {
        if (AppState.instance.gameMasterMode) {
            if (entity.category == Category.Hero || entity.category == Category.NPC || entity.category == Category.Enemy) {
                return entity.location.localeId === AppState.instance.currentLocale!.id && entity.visible && (entity as any).unique && (entity as any).groupMembers.list.length === 0;
            } else {
                return entity.location.localeId === AppState.instance.currentLocale!.id && entity.visible;
            }
        } else {
            if (AppState.instance.selectedPlayerCharacter !== null && AppState.instance.selectedPlayerCharacter.groupMembers.list.length > 0) {
                return AppState.instance.selectedPlayerCharacter !== null && entity.category == Category.Group && entity.id === AppState.instance.selectedPlayerCharacter.groupMembers.list[0].group!.id
            } else {
                return AppState.instance.selectedPlayerCharacter !== null && entity.category == Category.Hero && entity.id === AppState.instance.selectedPlayerCharacter.id
            }
        }
    }
}
//locales
//native items
//characters
//caches
//groups
//battlefields
//events