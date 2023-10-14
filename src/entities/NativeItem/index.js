import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { NativeItemPanel, panelInstance } from "./panel";

export default class NativeItem extends Entity {
    fields = {
        name: "New Item",
        unique: true,
        currency: false,
        iconSrc: "./assets/loot.png",
        equippable: false,
        notes: ""
    }
    icon = new Image();
    stats = [];
    inventoryItems = [];
    logs = [];

    panel = <NativeItemPanel entity={this} />;

    constructor(data) {
        super({ ...data, category: "nativeItems" });
    }

    static create(game, cb) {
        var newEntity;
        if (game.online) {
            API.create("nativeItems", { gameId: game.id }, (result) => {
                newEntity = new NativeItem({ ...result, game });
                newEntity.setUp();
                if (typeof cb === "function") {
                    cb(newEntity);
                }
            })
        } else {
            newEntity = new NativeItem({ id: game.getId("nativeItems"), ...NativeItem.defaults, game });
            newEntity.setUp();
            if (typeof cb === "function") {
                cb(newEntity);
            }
        }
    }

    setUp() {
        setUpFunctions.setUpFields(this);
        setUpFunctions.setUpStats(this);
        setUpFunctions.setUpLogs(this);
        super.refreshButton();
        this.refreshPanel();
    }

    refreshPanel() {
        this.panel = <NativeItemPanel entity={this} />
        if (typeof panelInstance !== "undefined") {
            panelInstance.forceUpdate();
        }
    }

    cascadeDelete() {
        while (this.inventoryItems.length > 0) {
            this.inventoryItems[0].forceDelete();
        }
        while (this.stats.length > 0) {
            this.stats[0].forceDelete();
        }
        while (this.logs.length > 0) {
            this.logs[0].forceDelete();
        }
    }

    afterUpdate(field, oldValue, newValue) {
        if (field === "unique") {
            while (this.inventoryItems.length > 0) {
                this.inventoryItems[0].deleteOffline();
            }
            if (newValue) {
                this.fields.currency = false;
            }
        }
        if (field === "currency" && newValue) {
            this.fields.unique = false;
            this.fields.equippable = false;
            while (this.inventoryItems.length > 0) {
                this.inventoryItems[0].deleteOffline();
            }
        }
        if (field === "equippable" && newValue) {
            this.fields.currency = false;
        }
    }

    save() {
        var data = { stats: [], logs: [] };
        this.stats.forEach((stat) => {
            data.stats[data.stats.length] = stat.save();
        })
        this.logs.forEach((log) => {
            data.logs[data.logs.length] = log.save();
        })
        return { ...super.save(), ...data }
    }
}