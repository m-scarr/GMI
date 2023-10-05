import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { LogPanel, panelInstance } from "./panel";

export default class Log extends Entity {

    fields = {
        text: null,
        createdAt: null
    }
    owner = null;

    panel = <LogPanel entity={this} />

    constructor(data) {
        super({ ...data, category: "logs" });
        if (!this.game.online && this.fields.createdAt === "") {
            this.setCreatedAt();
        }
    }

    static create(game, owner, text, cb) {
        var switchCase = {
            "heroes": "characterId",
            "npcs": "characterId",
            "enemies": "characterId",
            "groups": "groupId",
            "nativeItems": "itemId",
            "caches": "cacheId",
            "battlefields": "battlefieldId",
            "locales": "localeId",
            "events": "eventId"
        }
        if (game.online) {
            API.create("logs", { [switchCase[owner.category]]: owner.id, text }, (result) => {
                var newEntity = new Log({ ...result, owner, text, game });
                newEntity.setUp();
                if (typeof cb === "function") {
                    cb(newEntity);
                }
            })
        } else {
            var newEntity = new Log({ ...Log.defaults, owner, text, game });
            newEntity.setUp();
            if (typeof cb === "function") {
                cb(newEntity);
            }
        }
    }

    setUp() {
        setUpFunctions.setUpFields(this);
        setUpFunctions.setUpOwner(this);
    }

    refreshPanel() {
        this.panel = <LogPanel entity={this} />
        if (typeof panelInstance !== "undefined") {
            panelInstance.forceUpdate();
        }
    }

    setCreatedAt() {
        const date = new Date();
        var hours = date.getHours() > 12 ? date.getHours() - 12 : (date.getHours() === 0 ? 12 : date.getHours());
        var AMPM = date.getHours() > 11 ? "PM" : "AM"
        this.fields.createdAt = (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear()) + " @ " + (hours + ":" +
            ((date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + ":" + (date.getSeconds() < 10 ? "0" : "") + date.getSeconds() + " " + AMPM))
    }

    cascadeDelete() {
        this.owner.removeLog(this);
    }

    afterUpdate(field, oldValue, newValue) {
    }

    save() {
        if (typeof this.owner !== "undefined") {
            var data = {};
            var switchCase = {
                "heroes": "characterId",
                "npcs": "characterId",
                "enemies": "characterId",
                "groups": "groupId",
                "nativeItems": "itemId",
                "caches": "cacheId",
                "battlefields": "battlefieldId",
                "locales": "localeId",
                "events": "eventId"
            }
            data[switchCase[this.owner.category]] = this.owner.id;
            return { ...super.save(), ...data };
        }
    }
}