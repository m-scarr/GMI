import API from ".";
import { runInAction, toJS } from "mobx";
import { Category } from "../state/types";
import Game from "../state/Game";
import AppState from "../state/AppState";

const argNames: { [key: string]: any } = {
    Combatant: ["characterId", "battlefieldId", "ally"],
    GroupMember: ["characterId", "groupId"],
    InventoryItem: ["ownerCategory", "ownerId", "nativeItemId"],
    Log: ["ownerCategory", "ownerId", "text"],
    Stat: ["nativeItemId", "name", "value"]
};

export function $create(target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = async function (...args: any[]) {
        const argValues = args;
        let category: any;
        if (window.location.port === "" || window.location.port === "8080") {
            category = Category[new target.prototype.constructor().category];
        } else {
            category = ((target.toString().split("Category.")[1]).split(";")[0]);
        }
        const argObj: { [key: string]: any } = {};
        if (category in argNames) {
            argValues.forEach((val: any, index: number) => {
                let argName = argNames[category][index];
                let argVal = val;
                if (argName === "ownerCategory") {
                    argVal = Category[val];
                    if (argVal == "Hero" || argVal == "NPC" || argVal == "Enemy") {
                        argVal = "Character";
                    }
                }
                argObj[argName] = argVal;
            });
        }
        const newEntity = await API.create(category, argObj);
        if (newEntity !== null && !(!AppState.instance.gameMasterMode && category == "GroupMember")) {
            return new target.prototype.constructor(newEntity);
        } else {
            Game.instance?.refresh();
        }
    };

    return descriptor;
}

export function $update(_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalSetter = descriptor.set!;

    descriptor.set = async function (val: any) {
        let updateObj: any = {};
        if (propertyKey === "location") {
            updateObj = val;
        } else {
            updateObj[propertyKey] = val;
        }
        if (await API.update((this as any).category, (this as any).id, updateObj) && !(!AppState.instance.gameMasterMode && (this as any).category == Category.GroupMember && propertyKey == "quantity" && val == 0)) {
            runInAction(() => { originalSetter.call(this, val); });
        } else {
            Game.instance?.refresh();
        }
    }

    return descriptor;
}

export function $delete(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        const category = (this as any).category;
        const id = (this as any).id;
        if (await API.delete(category, id)) {
            return originalMethod.apply(this, args);
        } else {
            Game.instance?.refresh();
        }
    };

    return descriptor;
}