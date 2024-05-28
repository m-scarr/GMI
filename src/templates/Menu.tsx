import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react'
import AppState from '../state/AppState';
import MenuHeader from '../components/MenuHeader';
import SearchBar from "../components/SearchBar";
import Button from '../components/Button';
import Hero from '../state/Hero';
import Game from '../state/Game';
import { Category } from '../state/types';
import Entity from '../state/Entity';
import Options from './Options';
import HeroPanel from './HeroPanel';
import NPCPanel from './NPCPanel';
import EnemyPanel from './EnemyPanel';
import GroupPanel from './GroupPanel';
import NativeItemPanel from './NativeItemPanel';
import CachePanel from './CachePanel';
import BattlefieldPanel from './BattlefieldPanel';
import LocalePanel from './LocalePanel';
import EventPanel from './EventPanel';
import NameInput from '../components/NameInput';
import PlayerCharacterPanel from './PlayerCharacterPanel';

type Props = {}

function Menu({ }: Props) {
    const [showMenuHover, setShowMenuHover] = useState<boolean>(false);
    const [contentTop, setContentTop] = useState<number>(400);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const contentRef = useRef<any>(null);
    const intervalRef = useRef<any>(null);

    const panelSwitchCase = {
        [Category.Hero]: <HeroPanel />,
        [Category.NPC]: <NPCPanel />,
        [Category.Enemy]: <EnemyPanel />,
        [Category.Group]: <GroupPanel />,
        [Category.NativeItem]: <NativeItemPanel />,
        [Category.Cache]: <CachePanel />,
        [Category.Battlefield]: <BattlefieldPanel />,
        [Category.Locale]: <LocalePanel />,
        [Category.Event]: <EventPanel />
    }

    useEffect(() => {
        if (contentRef.current) {
            setContentTop(contentRef.current.getBoundingClientRect().top);
            setHeight(window.innerHeight);
        }
    }, [AppState.instance.tick]);
    return <>
        {AppState.instance.showMenu ?
            <div style={AppState.instance.gameMasterMode ? {
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                width: AppState.instance.menuWidth,
                borderRight: "2px solid white"
            } :
                {
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: AppState.instance.menuWidth,
                    borderRight: "2px solid white",
                    overflowY: "scroll",
                    overflowX: "scroll"
                }}
                id="menu"
            >{AppState.instance.gameMasterMode ?
                (<>
                    <MenuHeader />
                    {AppState.instance.currentEntity === null ? <SearchBar /> : <NameInput />}
                    <div ref={contentRef} style={{ width: "100%", height: height - contentTop, overflowY: "scroll" }}>
                        {
                            AppState.instance.currentCategory === null ? <Options /> : AppState.instance.currentEntity !== null ? (panelSwitchCase as any)[AppState.instance.currentCategory] :
                                <>
                                    {
                                        (Game.instance as any)[AppState.instance.currentCategory!].list.map((entity: any) => {
                                            return entity.name.toUpperCase().includes(AppState.instance.searchValue.toUpperCase()) ? <Button hoverable={true} key={Category[entity.category] + "-" + entity.id} onClick={() => { AppState.instance.currentEntity = entity; }}>{entity.name}</Button> : null
                                        })
                                    }
                                    <Button hoverable={true} onClick={() => {
                                        Entity.create(AppState.instance.currentCategory!);
                                    }}>+</Button>
                                </>
                        }
                    </div>
                </>) : <PlayerCharacterPanel />}
            </div>
            : null}
        {Game.instance !== null ?
            <img style={{
                position: "fixed",
                top: 0,
                left: AppState.instance.showMenu ? AppState.instance.menuWidth : 0,
                zIndex: 10,
                transform: `scaleX(${AppState.instance.showMenu ? '1' : '-1'})`,
                borderBottomRightRadius: AppState.instance.showMenu ? 4 : 0,
                borderBottomLeftRadius: AppState.instance.showMenu ? 0 : 4,
                padding: "2px 0",
                backgroundColor: showMenuHover ? "rgba(255, 255, 255, .75)" : "rgba(255, 255, 255, .5)",
                opacity: showMenuHover ? 1 : .75,
            }}
                onMouseEnter={() => {
                    setShowMenuHover(true);
                }}
                onMouseLeave={() => {
                    setShowMenuHover(false);
                }}
                onMouseOut={() => {
                    setShowMenuHover(false);
                }}
                alt=""
                src="./assets/back.png"
                onClick={() => {
                    AppState.instance.showMenu = !AppState.instance.showMenu;
                }} />
            :
            null}
    </>
}

export default observer(Menu);