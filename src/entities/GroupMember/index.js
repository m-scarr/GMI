import Entity from "../Entity";
import API from "../../API";
import setUpFunctions from "../Entity/setUpFunctions";

import { GroupMemberPanel, panelInstance } from "./panel";

export default class GroupMember extends Entity {
  static defaults = {
    quantity: 1
  }

  fields = {
    quantity: null
  }

  character = null;
  group = null;

  panel = <GroupMemberPanel entity={this} />;

  constructor(data) {
    super({ ...data, category: "groupMembers" })
  }

  static create(game, group, character, cb) {
    var newEntity;
    if (game.online) {
      API.create("groupMembers", { groupId: group.id, characterId: character.id }, (result) => {
        newEntity = new GroupMember({ ...result, groupId: group.id, characterId: character.id, game });
        newEntity.setUp();
        if (typeof cb === "function") {
          cb(newEntity);
        }
      })
    } else {
      newEntity = new GroupMember({ id: game.getId("groupMembers"), ...Cache.defaults, groupId: group.id, characterId: character.id, game });
      newEntity.setUp();
      if (typeof cb === "function") {
        cb(newEntity);
      }
    }
  }

  setUp() {
    setUpFunctions.setUpFields(this);
    setUpFunctions.setUpCharacter(this);
    setUpFunctions.setUpGroup(this);
    super.refreshButton();
    this.refreshPanel();
  }

  refreshPanel() {
    this.panel = <GroupMemberPanel entity={this} />
    if (typeof panelInstance !== "undefined") {
      panelInstance.forceUpdate();
    }
  }

  afterUpdate(field, oldValue, newValue) {
    if (field === "quantity" && newValue < 1) {
      this.forceDelete();
    }
  }

  cascadeDelete() {
    this.character.removeGroupMember(this);
    this.group.removeGroupMember(this);
  }

  save() {
    var data = {};
    data.groupId = this.group.id;
    data.characterId = this.character.id;
    return { ...super.save(), ...data };
  }
}