import API from ".";
import { runInAction } from "mobx";
import { Category } from "../state/types";

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
        let category;
        if (window.location.port === "" || window.location.port === "8080") {
            category = ((target.toString().split(`"category",S.`)[1]).split(")")[0]);
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
        return new target.prototype.constructor(newEntity);
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
        const currentVal = (this as any)[`_${propertyKey}`];
        //runInAction(() => { originalSetter.call(this, val); });
        const result = await API.update((this as any).category, (this as any).id, updateObj);
        runInAction(() => { originalSetter.call(this, result ? val : [currentVal]); });
    }
    return descriptor;
}

export function $delete(_target: any, _propertyKey: string, _descriptor: PropertyDescriptor) {
    const originalMethod = _descriptor.value;

    _descriptor.value = async function (...args: any[]) {
        const category = (this as any).category; // Assuming this property exists on the object
        const id = (this as any).id; // Assuming this property exists on the object
        if (await API.delete(category, id)) {
            return originalMethod.apply(this, args);
        }
    };

    return _descriptor;
}

function getParamNames(func: Function) {
    console.log(func)
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const ARGUMENT_NAMES = /([^\s,]+)/g;
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        return [];
    return result;
}