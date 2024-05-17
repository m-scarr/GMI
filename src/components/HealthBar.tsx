import { useEffect, useState } from 'react';
import Button from './Button';
import NumberInput from './inputs/NumberInput';
import AppState from '../state/AppState';
import Hero from '../state/Hero';
import NPC from '../state/NPC';
import Enemy from '../state/Enemy';
import { observer } from 'mobx-react-lite';

type Props = {}

function HealthBar({ }: Props) {
    const [entity, setEntity] = useState(AppState.instance.currentEntity as (Hero | NPC | Enemy));
    const [hp, setHp] = useState<number>(entity.hp);
    const [maxHp, setMaxHp] = useState<number>(entity.maxHp);
    useEffect(() => {
        setEntity(AppState.instance.currentEntity as (Hero | NPC | Enemy));
        setHp((AppState.instance.currentEntity as (Hero | NPC | Enemy)).hp);
        setMaxHp((AppState.instance.currentEntity as (Hero | NPC | Enemy)).maxHp);
    }, [AppState.instance.currentEntity, (AppState.instance.currentEntity as (Hero | NPC | Enemy))?.hp, (AppState.instance.currentEntity as (Hero | NPC | Enemy))?.maxHp]);
    return (
        <Button>
            Health
            <div style={
                {
                    marginTop: 8,
                    border: "1px solid white",
                    height: 48,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    background: entity.unique ? `linear-gradient(to right, green ${hp * 100 / maxHp}%, red ${hp * 100 / maxHp}%)` : `green`
                }}>
                <div style={{ width: 96 }}>
                    <NumberInput
                        value={entity.unique ? hp : maxHp}
                        max={9999}
                        onInput={setHp}
                        onIdle={(val: number) => {
                            entity.hp = val;
                        }}
                        locked={!entity.unique}
                        fontSize={24} />
                </div>
                /
                <div style={{ width: 96 }}>
                    <NumberInput
                        value={maxHp}
                        max={9999}
                        onInput={setMaxHp}
                        onIdle={(val: number) => {
                            entity.maxHp = val;
                        }}
                        fontSize={24} />
                </div>
            </div>
        </Button>
    )
}

export default observer(HealthBar);