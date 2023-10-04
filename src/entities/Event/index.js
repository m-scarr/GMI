import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { EventPanel, panelInstance } from "./panel";

export default class Event extends Entity {

    static defaults = {
        name: "New Event",
        visible: true,
        markerSrc: "./assets/event.png",
        notes: ""
    }

    fields = {
        name: null,
        location: { localeId: null, x: null, y: null },
        visible: null,
        markerSrc: null,
        notes: null
    }

    logs = [];

    marker = new Image();

    panel = <EventPanel entity={this} />;

    constructor(data) {
        super({ ...data, category: "events" });
    }

    static create(game, cb) { //create from + button, not from loading
        var newEntity;
        if (game.online) {
            API.create("events", {}, (result) => {
                newEntity = new Event({ ...result, game });
                newEntity.setUp();
                if (typeof cb === "function") {
                    cb(newEntity);
                }
            })
        } else {
            newEntity = new Event({ id: game.getId("events"), ...Event.defaults, game });
            newEntity.setUp();
            if (typeof cb === "function") {
                cb(newEntity);
            }
        }
    }

    setUp() {
        setUpFunctions.setUpFields(this);
        setUpFunctions.setUpLocation(this);
        setUpFunctions.setUpMarker(this);
        setUpFunctions.setUpLogs(this);
    }

    refreshPanel() {
        this.panel = <EventPanel entity={this} />
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
        var data = { logs: [] }
        this.logs.forEach((log) => {
            data.logs[data.logs.length] = log.save();
        })
        return { ...super.save(), ...data }
    }
}