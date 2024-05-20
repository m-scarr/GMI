import API from ".";
import { runInAction } from "mobx"
import { Category } from "../state/types";

export function $create(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const argNames = getParamNames(target[propertyKey]);
    descriptor.value = async function (...args: any[]) {
        const argValues = args;
        const argObj: { [key: string]: any } = {};
        argNames.forEach((argName: string, index: number) => {
            argObj[argName.replace('_', '')] = argValues[index];
            if (argName === "_ownerCategory") {
                if (argValues[index] == Category.Hero || argValues[index] == Category.NPC || argValues[index] == Category.Enemy) {
                    argObj[argName.replace('_', '')] = "Character";
                } else {
                    argObj[argName.replace('_', '')] = (Category as any)[argValues[index]];
                }
            }
        });
        let category;
        if (API.prod) {
            category = ((target.toString().split(`"category",S.`)[1]).split(")")[0]);
        } else {
            category = ((target.toString().split("Category.")[1]).split(";")[0]);
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
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const ARGUMENT_NAMES = /([^\s,]+)/g;
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        return [];
    return result;
}