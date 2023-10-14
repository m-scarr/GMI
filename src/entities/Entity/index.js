import API from "../../API";
import { EntityButton, buttonInstance } from "./button";

import { menuInstance } from "../../Menu";

export default class Entity {
    protoData;
    fields = {}
    id;
    category = "";
    game;

    button = <EntityButton entity={this} />

    testImage = new Image();

    constructor(data) {
        this.protoData = data;
        this.category = data.category;
        this.id = data.id;
        this.game = data.game;
        this.button = <EntityButton entity={this} key={"entity-button-" + data.category + data.id} />
        this.game.addEntity(this);
        if (this.category === "heroes" ||
            this.category === "enemies" ||
            this.category === "npcs" ||
            this.category === "groups" ||
            this.category === "groupMembers" ||
            this.category === "caches" ||
            this.category === "battlefields" ||
            this.category === "locales" ||
            this.category === "events") {
            this.game.app.getMarkerEntities();
        }
        menuInstance.forceUpdate();
    }

    refresh(data) {
        this.protoData = data;
        Object.keys(this.fields).forEach((field) => {
            if (typeof data[field] !== "undefined") {
                this.fields[field] = data[field];
            }
        })
        this.refreshButton();
        this.refreshPanel();
    }

    refreshButton() {
        this.button = <EntityButton entity={this} key={"entity-button-" + this.category + this.id} />
        if (typeof buttonInstance !== "undefined") {
            buttonInstance.forceUpdate();
        }
    }

    addGroupMember(groupMember) {
        this.groupMembers.push(groupMember);
    }

    removeGroupMember(groupMember) {
        this.groupMembers.removeById(groupMember.id)
    }

    addLog(log) {
        this.logs.unshift(log);
    }

    removeLog(log) {
        this.logs.removeById(log.id);
    }

    addCombatant(combatant) {
        this.combatants.push(combatant);
    }

    removeCombatant(combatant) {
        this.combatants.removeById(combatant.id);
    }

    addStat(stat) {
        this.stats.push(stat.id);
    }

    removeStat(stat) {
        this.stats.removeById(stat.id);
    }

    addInventoryItem(inventoryItem) {
        this.inventoryItems.push(inventoryItem);
    }

    removeInventoryItem(inventoryItem) {
        this.inventoryItems.removeById(inventoryItem.id)
    }

    set(field, value) {
        if (this.game.online) {
            API.updateEntity(this, field, value, (updated) => {
                if (updated) {
                    this.forceUpdate(field, value);
                }
            })
        } else {
            this.forceUpdate(field, value);
        }
    }

    forceUpdate(field, value) {
        var oldValue = this.fields[field];
        this.fields[field] = value;
        if (field.slice(-3) === "Src") {
            //this[field.split("Src")[0]].src = value;
            this.testImage.src = value;
            this.testImage.onload = () => {
                this[field.split("Src")[0]].src = this.testImage.src;
                this.fields[field] = this.testImage.src;
                this.afterUpdate(field, oldValue, this.testImage.src);
                this.refreshButton();
                this.refreshPanel();
            }
            this.testImage.onerror = () => {
                this.testImage.src = "./assets/noimage.png";
            }
        } else {
            if (field === "visible" || field === "location") {
                this.game.app.getMarkerEntities();
            }
            this.afterUpdate(field, oldValue, value);
            this.refreshButton();
            this.refreshPanel();
        }
    }

    afterUpdate(field, oldValue, newValue) {

    }

    delete() {
        if (this.game.online) {
            API.deleteEntity(this, (deleted) => {
                if (deleted) {
                    this.forceDelete();
                }
            })
        } else {
            this.forceDelete()
        }
    }

    forceDelete() {
        if (typeof this.cascadeDelete === "function") {
            this.cascadeDelete();
        }
        this.game.removeEntity(this);
        if (this.category === "heroes" ||
            this.category === "enemies" ||
            this.category === "npcs" ||
            this.category === "groups" ||
            this.category === "caches" ||
            this.category === "battlefields" ||
            this.category === "locales" ||
            this.category === "events") {
            this.game.app.getMarkerEntities();
        }
    }

    save() {
        var data = {};
        data.id = this.id;
        Object.keys(this.fields).forEach((field) => {
            if (field === "location") {
                if (typeof this.fields.location.locale !== "undefined") {
                    data.localeId = this.fields.location.locale === null ? null : this.fields.location.locale.id
                }
                data.x = this.fields.location.x;
                data.y = this.fields.location.y;
            } else {
                data[field] = this.fields[field];
            }
        })
        return data;
    }
}