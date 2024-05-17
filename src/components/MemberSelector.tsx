import { observer } from 'mobx-react-lite';
import Button from './Button';

import { useEffect, useState } from 'react';
import TextInput from './inputs/TextInput';
import { Category, refData } from '../state/types';
import Game from '../state/Game';
import Hero from '../state/Hero';
import NPC from '../state/NPC';
import Enemy from '../state/Enemy';
import GroupMember from '../state/GroupMember';
import AppState from '../state/AppState';
import Entity from '../state/Entity';

type Props = {}

function MemberSelector({ }: Props) {
    const [category, setCategory] = useState<Category.Hero | Category.NPC | Category.Enemy>(Category.Hero);
    const [searchValue, setSearchValue] = useState<string>("");
    const [entity, setEntity] = useState<any>(AppState.instance.currentEntity);

    useEffect(() => {
        setEntity(AppState.instance.currentEntity);
    }, [AppState.instance.currentEntity]);

    useEffect(() => {
        setSearchValue("");
    }, [category])

    return (
        <Button>
            <div style={{ paddingBottom: 8 }}>
                Add Members
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "calc(100% + 15px)", transform: "translateX(-6px)" }}>
                <div style={{ width: "33%", backgroundColor: "green" }} onClick={() => { setCategory(Category.Hero); }}>
                    <div className='hoverable' style={{ paddingTop: 6 }}>
                        <img alt="Heroes" src="./assets/hero.png" />
                    </div>
                </div>
                <div style={{ width: "33%", backgroundColor: "blue" }} onClick={() => { setCategory(Category.NPC); }}>
                    <div className='hoverable' style={{ paddingTop: 6 }}>
                        <img alt="NPCs" src="./assets/npc.png" />
                    </div>
                </div>
                <div style={{ width: "33%", backgroundColor: "red" }} onClick={() => { setCategory(Category.Enemy); }}>
                    <div className='hoverable' style={{ paddingTop: 6 }}>
                        <img alt="enemies" src="./assets/enemy.png" />
                    </div>
                </div>
            </div>
            <div style={{ width: "calc(100% + 12px)", transform: "translateX(-6px)" }}>
                <TextInput value={searchValue} onInput={setSearchValue} fontSize={24} color={refData[category].color} placeholder={`Search ${refData[category].plural}...`} />
            </div>
            <div style={{ transform: "translateX(-6px)", width: "calc(100% + 11px)", height: 250, overflowY: "scroll" }}>
                {
                    Game.instance![category].list.map((character: Hero | NPC | Enemy) => {
                        return Entity.hasMember(entity, character) ? null :
                            <Button
                                key={`member-selector-button-${character.id}`}
                                hoverable={true}
                                onClick={() => {
                                    GroupMember.create(character.id, entity.id);
                                }}>
                                {character.name}
                            </Button>
                    })
                }
            </div>
        </Button>
    )
}

export default observer(MemberSelector);