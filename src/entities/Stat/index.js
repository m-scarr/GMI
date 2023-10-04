import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { StatPanel, panelInstance } from "./panel"

export default class Stat extends Entity {
    fields = {
        name: null,
        value: null
    }
    item = null;

    panel = <StatPanel entity={this} />

    constructor(data) {
        super({ ...data, category: "stats" });
    }

    static create(game, item, name, value, cb) {
        var newEntity;
        if (game.online) {
            API.create("stats", {}, (result) => {
                newEntity = new Stat({ ...result, itemId: item.id, name, value, game });
                newEntity.setUp();
                if (typeof cb === "function") {
                    cb(newEntity);
                }
            })
        } else {
            newEntity = new Stat({ id: game.getId("stats"), itemId: item.id, name, value, game });
            newEntity.setUp();
            if (typeof cb === "function") {
                cb(newEntity);
            }
        }
    }

    setUp() {
        setUpFunctions.setUpFields(this);
        setUpFunctions.setUpItem(this);
    }

    refreshPanel() {
        this.panel = <StatPanel entity={this} />
        if (typeof panelInstance !== "undefined") {
            panelInstance.forceUpdate();
        }
    }

    afterUpdate(field, oldValue, newValue) {

    }

    cascadeDelete() {
        this.item.removeStat(this);
    }

    save() {
        var data = {};
        data.itemId = this.item.id;
        return { ...super.save(), ...data };
    }
}