import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { InventoryItemPanel, panelInstance } from "./panel";

export default class InventoryItem extends Entity {
    static defaults = {
        quantity: 1,
        equipped: false
    }

    fields = {
        quantity: null,
        equipped: null
    }

    owner = null;
    item = null;

    constructor(data) {
        super({ ...data, category: "inventoryItems" });
    }

    static create(game, owner, item, cb) {
        var switchCase = {
            "heroes": "characterId",
            "npcs": "characterId",
            "enemies": "characterId",
            "caches": "cacheId"
        }
        var newEntity;
        if (game.online) {
            API.create("inventoryItems", { [switchCase[owner.category]]: owner.id, itemId: item.id }, (result) => {
                newEntity = new InventoryItem({ ...result, [switchCase[owner.category]]: owner.id, itemId: item.id, game });
                newEntity.setUp();
                if (typeof cb === "function") {
                    cb(newEntity);
                }
            })
        } else {
            newEntity = new InventoryItem({ id: game.getId("inventoryItems"), ...InventoryItem.defaults, [switchCase[owner.category]]: owner.id, itemId: item.id, game });
            newEntity.setUp();
            if (typeof cb === "function") {
                cb(newEntity);
            }
        }
    }

    setUp() {
        setUpFunctions.setUpFields(this);
        setUpFunctions.setUpOwner(this);
        setUpFunctions.setUpItem(this);
    }

    refreshPanel() {
        this.panel = <InventoryItemPanel entity={this} />
        if (typeof panelInstance !== "undefined") {
            panelInstance.forceUpdate();
        }
    }

    afterUpdate(field, oldValue, newValue) {
        if (field === "quantity" && newValue < 1) {
            this.deleteOffline();
        }
    }

    cascadeDelete() {
        this.game.app.setModal("item", null);
        this.game.app.set("currentModal", null);
        this.owner.removeInventoryItem(this);
        this.item.removeInventoryItem(this);
    }

    save() {
        var data = {};
        var switchCase = {
            "heroes": "characterId",
            "npcs": "characterId",
            "enemies": "characterId",
            "caches": "cacheId"
        }
        data[switchCase[this.owner.category]] = this.owner.id;
        data.itemId = this.item.id;
        return { ...super.save(), ...data }
    }
}