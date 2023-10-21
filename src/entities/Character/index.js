import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { CharacterPanel, panelInstance } from "../Character/panel"

export default class Character extends Entity {

    static defaults = {
        heroes: {
            name: "New Hero",
            markerSrc: "./assets/hero.png",
            visible: true,
            unique: true,
            hp: 10,
            maxHp: 10,
        },
        npcs: {
            name: "New NPC",
            markerSrc: "./assets/npc.png",
            visible: true,
            unique: true,
            hp: 10,
            maxHp: 10,
        },
        enemies: {
            name: "New Enemy",
            markerSrc: "./assets/enemy.png",
            visible: true,
            unique: true,
            hp: 10,
            maxHp: 10,
        }
    }

    fields = {
        name: null,
        location: { locale: null, x: null, y: null },
        markerSrc: null,
        visible: null,
        unique: null,
        hp: null,
        maxHp: null,
        playerUserId: null,
    }

    inventoryItems = [];
    logs = [];
    marker = new Image();

    combatants = [];
    groupMembers = [];

    unobtainedItems = [];

    panel = <CharacterPanel entity={this} />

    constructor(data) {
        super({ ...data });
    }

    static create(game, category, cb) {
        var newEntity;
        if (game.online) {
            API.create(category, { gameId: game.id, category }, (result) => {
                newEntity = new Character({ ...result, category, game });
                newEntity.setUp();
                if (typeof cb === "function") {
                    cb(newEntity);
                }
            })
        } else {
            newEntity = new Character({ id: game.getId(category), ...Character.defaults[category], category, game });
            newEntity.setUp();
            if (typeof cb === "function") {
                cb(newEntity);
            }
        }
    }

    isVisible() {
        return (typeof this.fields.location !== "undefined" && this.game.app.state.currentLocale === this.fields.location.locale && this.fields.unique && this.fields.visible && (typeof this.groupMembers === "undefined" || this.groupMembers.length === 0));
    }

    refreshPanel() {
        this.panel = <CharacterPanel entity={this} />
        if (typeof panelInstance !== "undefined") {
            panelInstance.forceUpdate();
        }
    }

    setUp() {
        setUpFunctions.setUpFields(this);
        setUpFunctions.setUpLocation(this);
        setUpFunctions.setUpMarker(this);
        setUpFunctions.setUpInventoryItems(this);
        setUpFunctions.setUpLogs(this);
        super.refreshButton();
        this.refreshPanel();
    }

    cascadeDelete() {
        while (this.inventoryItems.length > 0) {
            this.inventoryitems[0].forceDelete();
        }
        while (this.groupMembers.length > 0) {
            this.groupMembers[0].forceDelete();
        }
        while (this.combatants.length > 0) {
            this.combatants[0].forceDelete();
        }
        while (this.logs.length > 0) {
            this.logs[0].forceDelete();
        }
    }

    afterUpdate(field, oldValue, newValue) {
        if (field === "unique") {
            if (typeof this.inventory !== "undefined") {
                while (this.inventory.length > 0) {
                    this.inventory[0].forceDelete();
                }
            }
            while (this.groupMembers.length > 0) {
                this.groupMembers[0].forceDelete();
            }
            while (this.combatants.length > 0) {
                this.combatants[0].forceDelete();
            }
        }
        if (field === "hp") {
            this.combatants.forEach((combatant) => {
                combatant.fields.hp = newValue;
            })
        }
    }

    save() {
        var data = { inventory: [], logs: [], category: this.category };
        this.inventory.forEach((inventoryItem) => {
            data.inventory[data.inventory.length] = inventoryItem.save();
        });
        this.logs.forEach((log) => {
            data.logs[data.logs.length] = log.save();
        });
        return { ...super.save(), ...data }
    }
}