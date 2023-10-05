import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { GroupPanel, panelInstance } from "./panel";

export default class Group extends Entity {
    static defaults = {
        name: "New Group",
        visible: true,
        markerSrc: "./assets/group.png",
        notes: ""
    }

    fields = {
        name: null,
        location: { locale: null, x: null, y: null },
        visible: null,
        markerSrc: null,
        notes: null
    }

    groupMembers = [];
    nonMembers = [];
    logs = [];
    marker = new Image();

    panel = <GroupPanel entity={this} />;

    constructor(data) {
        super({ ...data, category: "groups" });
    }

    static create(game, cb) {
        var newEntity;
        if (game.online) {
            API.create("groups", {}, (result) => {
                newEntity = new Group({ ...result, game });
                newEntity.setUp();
                if (typeof cb === "function") {
                    cb(newEntity);
                }
            })
        } else {
            newEntity = new Group({ id: game.getId("groups"), ...Group.defaults, game });
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
        setUpFunctions.setUpGroupMembers(this);
    }

    refreshPanel() {
        this.panel = <GroupPanel entity={this} />
        if (typeof panelInstance !== "undefined") {
            panelInstance.forceUpdate();
        }
    }

    cascadeDelete() {
        while (this.groupMembers.length > 0) {
            this.groupMembers[0].forceDelete();
        }
        while (this.logs.length > 0) {
            this.logs[0].forceDelete();
        }
    }

    afterUpdate(field, oldValue, newValue) {
    }

    save() {
        var data = { members: [], logs: [] };
        this.groupMembers.forEach((member) => {
            data.members[data.members.length] = member.save();
        })
        this.logs.forEach((log) => {
            data.logs[data.logs.length] = log.save();
        });
        return { ...super.save(), ...data }
    }
}