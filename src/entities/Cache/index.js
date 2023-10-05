import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { CachePanel, panelInstance } from "./panel";

export default class Cache extends Entity {
    static defaults = {
        name: "New Cache",
        location: { locale: null, x: null, y: null },
        visible: true,
        notes: "",
        markerSrc: "./assets/cache.png"
    }

    fields = {
        name: null,
        location: { locale: null, x: null, y: null },
        visible: null,
        notes: null,
        markerSrc: null
    }

    logs = [];
    inventoryItems = [];

    unobtainedItems = [];
    marker = new Image();

    panel = <CachePanel entity={this} />

    constructor(data) {
        super({ ...data, category: "caches" });
    }

    static create(game, cb) {
        var newEntity;
        if (game.online) {
            API.create("caches", {}, (result) => {
                newEntity = new Cache({ ...result, game });
                newEntity.setUp();
                if (typeof cb === "function") {
                    cb(newEntity);
                }
            })
        } else {
            newEntity = new Cache({ id: game.getId("caches"), ...Cache.defaults, game });
            newEntity.setUp();
            if (typeof cb === "function") {
                cb(newEntity);
            }
        }
    }

    refreshPanel() {
        this.panel = <CachePanel entity={this} />
        if (typeof panelInstance !== "undefined") {
            panelInstance.forceUpdate();
        }
    }

    setUp() {
        setUpFunctions.setUpFields(this);
        setUpFunctions.setUpInventoryItems(this)
        setUpFunctions.setUpLogs(this);
        setUpFunctions.setUpMarker(this);
    }

    cascadeDelete() {
        while (this.inventoryItems.length > 0) {
            this.inventoryItems[0].forceDelete();
        }
        while (this.logs.length > 0) {
            this.logs[0].forceDelete();
        }
    }

    afterUpdate(field, oldValue, newValue) {
    }


    save() {
        var data = { inventory: [], logs: [] };
        this.inventory.forEach((inventoryItem) => {
            data.inventory[data.inventory.length] = inventoryItem.save();
        });
        this.logs.forEach((log) => {
            data.logs[data.logs.length] = log.save();
        });
        return { ...super.save(), ...data }
    }
}