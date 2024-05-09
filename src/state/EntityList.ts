import { runInAction } from "mobx";

export default class EntityList<T> {
    private _list: T[] = [];
    public get list() {
        return [...this._list];
    }
    public add(val: T) {
        runInAction(() => {
            this._list = [...this._list, val];
        })
    }
    public remove(val: T) {
        runInAction(() => {
            const index = this._list.indexOf(val);
            if (index !== -1) {
                this._list.splice(index, 1);
            } else {
                console.warn("The entity you attempted to remove was not on the list.")
            }
        });
    }
}