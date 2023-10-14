import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { BattlefieldPanel, panelInstance } from "./panel";

export default class Battlefield extends Entity {
    static defaults = {
        name: "New Battlefield",
        location: { locale: null, x: null, y: null },
        visible: true,
        scale: 1,
        mapSrc: "./assets/noimage.png",
        markerSrc: "./assets/battlefield.png",
        notes: ""
    }

    fields = {
        name: null,
        location: { locale: null, x: null, y: null },
        visible: null,
        scale: null,
        mapSrc: null,
        markerSrc: null,
        notes: null
    }

    combatants = [];
    logs = [];

    map = new Image();
    marker = new Image();

    panel = <BattlefieldPanel entity={this} />

    constructor(data) {
        super({ ...data, category: "battlefields" })
    }

    static create(game, cb) {
        var newEntity;
        if (game.online) {
            API.create("battlefields", { gameId: game.id }, (result) => {
                newEntity = new Battlefield({ ...result, game });
                newEntity.setUp();
                if (typeof cb === "function") {
                    cb(newEntity);
                }
            })
        } else {
            newEntity = new Battlefield({ id: game.getId("battlefields"), ...Battlefield.defaults, game });
            newEntity.setUp();
            if (typeof cb === "function") {
                cb(newEntity);
            }
        }
    }

    setUp() {
        setUpFunctions.setUpFields(this);
        setUpFunctions.setUpCombatants(this);
        setUpFunctions.setUpLogs(this);
        setUpFunctions.setUpMarker(this);
        super.refreshButton();
        this.refreshPanel();
        //this.refreshModal();
    }

    refreshPanel() {
        this.panel = <BattlefieldPanel entity={this} />
        if (typeof panelInstance !== "undefined") {
            panelInstance.forceUpdate();
        }
    }

    cascadeDelete() {
        while (this.combatants.length > 0) {
            this.combatants[0].forceDelete();
        }
        while (this.logs.length > 0) {
            this.logs[0].forceDelete();
        }
    }

    afterUpdate(field, oldValue, newValue) {
    }

    save() {
        var data = { combatants: [], logs: [] };
        this.combatants.forEach((combatant) => {
            data.combatants[data.combatants.length].push(combatant.save());
        });
        this.logs.forEach((log) => {
            data.logs[data.logs.length].push(log.save());
        });
        return { ...super.save(), ...data }
    }
}