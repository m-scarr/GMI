import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { LocalePanel, panelInstance } from "./panel";

export default class Locale extends Entity {
    static defaults = {
        name: "New Locale",
        visible: true,
        mapSrc: "./assets/noimage.png",
        markerSrc: "./assets/locale.png",
        notes: ""
    }

    fields = {
        name: null,
        location: { localeId: null, x: null, y: null },
        visible: null,
        mapSrc: null,
        markerSrc: null,
        notes: null
    }
    logs = [];
    map = new Image();
    marker = new Image();

    panel = <LocalePanel entity={this} />

    constructor(data) {
        super({ ...data, category: "locales" })
    }

    static create(game, cb) {
        var newEntity;
        if (game.online) {
            API.create("locales", {}, (result) => {
                newEntity = new Locale({ ...result, game });
                newEntity.setUp();
                if (typeof cb === "function") {
                    cb(newEntity);
                }
            })
        } else {
            newEntity = new Locale({ id: game.getId("locales"), ...Locale.defaults, game });
            newEntity.setUp();
            if (typeof cb === "function") {
                cb(newEntity);
            }
        }
    }

    setUp() {
        setUpFunctions.setUpFields(this);
        setUpFunctions.setUpLocation(this);
        setUpFunctions.setUpLogs(this);
    }

    refreshPanel() {
        this.panel = <LocalePanel entity={this} />
        if (typeof panelInstance !== "undefined") {
            panelInstance.forceUpdate();
        }
    }

    cascadeDelete() {
        while (this.logs.length > 0) {
            this.logs[0].forceDelete();
        }
    }

    afterUpdate(field, oldValue, newValue) {
    }
    
    save() {
        var data = { logs: [] };
        this.logs.forEach((log) => {
            data.logs[data.logs.length] = log.save();
        })
        return { ...super.save(), ...data }
    }
}