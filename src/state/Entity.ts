import { makeAutoObservable, runInAction } from "mobx";
import Game from "./Game";
import { Category } from "./types";

export default abstract class Entity {
    static build(entity: any, data: any) {
        makeAutoObservable(entity);
        runInAction(() => {
            entity.id = data.id;
            Object.keys(data).forEach((key: string) => {
                if (`_${key}` in entity) {
                    (entity as any)[`_${key}`] = data[key];
                }
            });
        });
        (Game.instance as any)[entity.category].add(entity);
    }

    static [Category.Hero]: (entity: any, data: any) => {

    }

}