import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { CombatantPanel, panelInstance } from "./panel";

export default class Combatant extends Entity {
    static defaults = {
        visible: true,
        hp: 10,
        ally: true,
        scale: 1
    }

    fields = {
        location: {
            x: null,
            y: null
        },
        visible: null,
        hp: null,
        ally: null,
        scale: null
    }
    character = null;
    battlefield = null;

    panel = <CombatantPanel entity={this} />

    constructor(data) {
        super({ ...data, category: "combatants" });
    }

    static create(game, battlefield, character, ally, x, y, cb) {
        var newEntity;
        if (game.online) {
            API.create("combatants", { battlefieldId: battlefield.id, characterId: character.id, ally, x, y }, (result) => {
                newEntity = new Combatant({ ...result, battlefieldId: battlefield.id, characterId: character.id, ally, x, y, game });
                newEntity.setUp();
                if (typeof cb === "function") {
                    cb(newEntity);
                }
            })
        } else {
            newEntity = new Combatant({ id: game.getId("combatants"), ...Combatant.defaults, battlefieldId: battlefield.id, characterId: character.id, ally, x, y, game });
            newEntity.setUp();
            cb(newEntity);
        }
    }

    setUp() {
        setUpFunctions.setUpFields(this);
        setUpFunctions.setUpCharacter(this);
        setUpFunctions.setUpBattlefield(this);
    }

    refreshPanel() {
        this.panel = <CombatantPanel entity={this} />
        if (typeof panelInstance !== "undefined") {
            panelInstance.forceUpdate();
        }
    }

    afterUpdate() {
    }

    cascadeDelete() {
        this.character.removeCombatant(this);
        this.battlefield.removeCombatant(this);
    }

    save() {
        var data = {};
        data.battlefieldId = this.battlefield.id;
        data.characterId = this.character.id;
        return { ...super.save(), ...data };
    }
}