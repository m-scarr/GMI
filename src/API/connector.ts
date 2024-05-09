import API from ".";
import { runInAction } from "mobx"

export function $create(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const argNames = getParamNames(target[propertyKey]);
    descriptor.value = async function (...args: any[]) {
        const argValues = args;
        const argObj: { [key: string]: any } = {};
        argNames.forEach((argName: string, index: number) => {
            argObj[argName.replace('_', '')] = argValues[index];
        });
        const category = ((target.toString().split("Category.")[1]).split(";")[0]);
        const newEntity = await API.create(category, argObj);
        return new target.prototype.constructor(newEntity);
    };
    return descriptor;
}

export function $update(_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalSetter = descriptor.set!;
    descriptor.set = async function (...args: any) {
        let updateObj: any = {};
        if (propertyKey === "location") {
            updateObj = args[0];
        } else {
            updateObj[propertyKey] = args[0];
        }
        const currentVal = (this as any)[`_${propertyKey}`];
        runInAction(() => { originalSetter.call(this, args); });
        const result = await API.update((this as any).category, (this as any).id, updateObj);
        runInAction(() => { originalSetter.call(this, result ? args : [currentVal]); });
    }
    return descriptor;
}

export function $delete(_target: any, _propertyKey: string, _descriptor: PropertyDescriptor) {
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