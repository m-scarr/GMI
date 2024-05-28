import { useEffect, useState } from "react";
import AppState from "../state/AppState";
import Button from "./Button";
import DropDown from "./inputs/DropDown";
import Game from "../state/Game";
import { Category } from "../state/types";
import Group from "../state/Group";
import GroupMember from "../state/GroupMember";
import { observer } from "mobx-react-lite";

type Props = {};

function GroupSelector({ }: Props) {

    const buildOptions = () => {
        const newOptions: { id: number | null, name: string }[] = [{ id: null, name: "None" }];
        Game.instance![Category.Group].list.forEach((group: Group) => {
            newOptions.push({
                id: group.id,
                name: group.name
            });
        });
        return newOptions;
    }

    const getValue = () => {
        return (AppState.instance.currentEntity as any).groupMembers.list.length < 1 ? null : (AppState.instance.currentEntity as any).groupMembers.list[0].group.id
    }

    const [entity, setEntity] = useState<any>(AppState.instance.currentEntity);
    const [options, setOptions] = useState<{ id: number | null, name: string }[]>(buildOptions());
    const [value, setValue] = useState<number | null>(getValue());
    useEffect(() => {
        setEntity(AppState.instance.currentEntity);
        setOptions(buildOptions());
        setValue(getValue());
    }, [AppState.instance.currentEntity, (AppState.instance.currentEntity as any).groupMembers.list, (AppState.instance.currentEntity as any).groupMembers.list[0]]);

    return entity.unique ? (
        <Button>
            Group
            <br />
            <DropDown options={options} value={value} onInput={async (val: number | null) => {
                if (val === null && entity.groupMembers.list.length > 0) {
                    entity.groupMembers.list[0].quantity = 0;
                } else if (val !== null) {
                    await GroupMember.create(entity.id, val);
                }
            }} />
        </Button>
    ) : null;
}

export default observer(GroupSelector);