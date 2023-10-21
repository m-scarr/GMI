import Log from "../Log";
import InventoryItem from "../InventoryItem";
import GroupMember from "../GroupMember";
import Stat from "../Stat";
import Combatant from "../Combatant";

const setUpFunctions = {
    setUpFields: (entity) => {
        Object.keys(entity.fields).forEach((field) => {
            if (typeof entity.protoData[field] !== "undefined") {
                entity.fields[field] = entity.protoData[field];
                if (field.slice(-3) === "Src") {
                    entity[field.split("Src")[0]].src = entity.protoData[field];
                }
            }
        })
    },

    setUpLogs: (entity) => {
        if (typeof entity.protoData.logs !== "undefined") {
            var foundEntity;
            var newEntity;
            entity.protoData.logs.forEach((log) => {
                foundEntity = entity.game.logs.findById(log.id);
                if (foundEntity === null) {
                    newEntity = new Log({ ...log, game: entity.game });
                    newEntity.setUp();
                }
            })

        }
    },

    setUpInventoryItems: (entity) => {
        if (typeof entity.protoData.inventory !== "undefined") {
            var newEntity;
            var foundEntity;
            entity.protoData.inventory.forEach((inventoryItem) => {
                foundEntity = entity.game.inventoryItems.findById(inventoryItem.id);
                if (foundEntity === null) {
                    newEntity = new InventoryItem({ ...inventoryItem, game: entity.game });
                    newEntity.setUp();
                } else {
                    foundEntity.refresh(inventoryItem);
                }
            })
            entity.inventoryItems.forEach((inventoryItem) => {
                foundEntity = entity.protoData.inventory.findById(inventoryItem.id);
                if (foundEntity === null) {
                    inventoryItem.forceDelete();
                }
            })
        }
    },

    setUpGroupMembers: (entity) => {
        if (typeof entity.protoData.members !== "undefined") {
            var newEntity;
            var foundEntity;
            entity.protoData.members.forEach((groupMember) => {
                foundEntity = entity.game.groupMembers.findById(groupMember.id);
                if (foundEntity === null) {
                    newEntity = new GroupMember({ ...groupMember, game: entity.game });
                    newEntity.setUp();
                } else {
                    foundEntity.refresh(groupMember);
                }
            })
        }
    },

    setUpStats: (entity) => {
        if (typeof entity.protoData.stats !== "undefined") {
            var newEntity;
            var foundEntity;
            entity.protoData.stats.forEach((stat) => {
                foundEntity = entity.game.stats.findById(stat.id);
                if (foundEntity === null) {
                    newEntity = new Stat({ ...stat, game: entity.game });
                    newEntity.setUp();
                } else {
                    foundEntity.refresh(stat);
                }
            })
        }
    },

    setUpCombatants: (entity) => {
        if (typeof entity.protoData.combatants !== "undefined") {
            var newEntity;
            var foundEntity;
            entity.protoData.combatants.forEach((combatant) => {
                foundEntity = entity.game.combatants.findById(combatant.id);
                if (foundEntity === null) {
                    newEntity = new Combatant({ ...combatant, game: entity.game });
                    newEntity.setUp();
                } else {
                    foundEntity.refresh(combatant);
                }
            })
        }
    },

    setUpMarker: (entity) => {
        entity.marker.src = entity.protoData.markerSrc;
    },

    setUpLocation: (entity) => {
        if (typeof entity.protoData.localeId !== "undefined") {
            entity.fields.location.locale = entity.game.locales.findById(entity.protoData.localeId);
        }
        if (typeof entity.protoData.x !== "undefined") {
            entity.fields.location.x = entity.protoData.x;
            entity.fields.location.y = entity.protoData.y;
        }
    },

    setUpOwner: (entity) => {
        var switchCase = (entity.category === "logs") ? {
            "characterId": [...entity.game.heroes, ...entity.game.npcs, ...entity.game.enemies],
            "groupId": entity.game.groups,
            "itemId": entity.game.nativeItems,
            "cacheId": entity.game.caches,
            "battlefieldId": entity.game.battlefields,
            "localeId": entity.game.locales,
            "eventId": entity.game.events
        } : {
            "characterId": [...entity.game.heroes, ...entity.game.npcs, ...entity.game.enemies],
            "cacheId": entity.game.caches,
        }
        var keys = Object.keys(switchCase);
        for (var i = 0; i < keys.length; i++) {
            if (typeof entity.protoData[keys[i]] !== "undefined" && entity.protoData[keys[i]] !== null) {
                entity.owner = switchCase[keys[i]].findById(entity.protoData[keys[i]]);
                if (entity.category === "inventoryItems") {
                    entity.owner.addInventoryItem(entity);
                } else {
                    entity.owner.addLog(entity);
                }
            }
        }
    },

    setUpGroup: (entity) => {
        entity.group = entity.game.groups.findById(entity.protoData.groupId);
        entity.group.addGroupMember(entity);
    },

    setUpBattlefield: (entity) => {
        entity.battlefield = entity.game.battlefields.findById(entity.protoData.battlefieldId);
        entity.battlefield.addCombatant(entity);
    },

    setUpItem: (entity) => {
        entity.item = entity.game.nativeItems.findById(entity.protoData.itemId);
        entity.item.addInventoryItem(entity);
    },

    setUpCharacter: (entity) => {
        entity.character = [...entity.game.heroes, ...entity.game.npcs, ...entity.game.enemies].findById(entity.protoData.characterId);
        console.log(entity.character)
        if (entity.category === "groupMembers") {
            entity.character.addGroupMember(entity);
        } else {
            entity.character.addCombatant(entity)
        }
    },

}

export default setUpFunctions;