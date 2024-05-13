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
    const entity = AppState.instance.currentEntity as (Hero | NPC | Enemy);
    const [hp, setHp] = useState<number>(entity.hp);
    const [maxHp, setMaxHp] = useState<number>(entity.maxHp);
    useEffect(() => {
        const entity = AppState.instance.currentEntity as (Hero | NPC | Enemy);
        setHp(entity.hp);
        setMaxHp(entity.maxHp);
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
                    background: `linear-gradient(to right, green ${hp * 100 / maxHp}%, red ${hp * 100 / maxHp}%)`
                }}>
                <div style={{ width: 96 }}>
                    <NumberInput
                        value={hp}
                        max={9999}
                        onInput={setHp}
                        onIdle={() => {
                            entity.hp = hp;
                        }}
                        fontSize={24} />
                </div>
                /
                <div style={{ width: 96 }}>
                <NumberInput
                        value={maxHp}
                        max={9999}
                        onInput={setMaxHp}
                        onIdle={() => {
                            entity.maxHp = maxHp;
                        }}
                        fontSize={24} />
                </div>
            </div>
        </Button>
    )
}

export default observer(HealthBar);