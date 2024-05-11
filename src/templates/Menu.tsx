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

type Props = {}

function Menu({ }: Props) {
    const [showMenuHover, setShowMenuHover] = useState<boolean>(false);
    const [contentTop, setContentTop] = useState<number>(400);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const contentRef = useRef<any>(null);
    const intervalRef = useRef<any>(null);
    useEffect(() => {
        if (intervalRef.current === null) {
            intervalRef.current = setInterval(() => {
                if (contentRef.current) {
                    setContentTop(contentRef.current.getBoundingClientRect().top);
                    setHeight(window.innerHeight);
                }
            }, 16);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, []);
    return <>
        {AppState.instance.showMenu ?
            <div style={{
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                width: AppState.instance.menuWidth,
                borderRight: "2px solid white"
            }}
                id="menu"
            >
                <MenuHeader />
                <SearchBar />
                <div ref={contentRef} style={{ width: "100%", height: height - contentTop, overflowY: "scroll" }}>
                    {
                        AppState.instance.currentCategory === null ? <div>options</div> :
                            <>
                                {
                                    (Game.instance as any)[AppState.instance.currentCategory!].list.map((entity: any) => {
                                        return <Button hoverable={true} key={Category[entity.category] + "-" + entity.id}>{entity.name}</Button>
                                    })
                                }
                                <Button hoverable={true} onClick={() => {
                                    Entity.create(AppState.instance.currentCategory!);
                                }}>+</Button>
                            </>
                    }
                </div>
            </div>
            : null}
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
    </>
}

export default observer(Menu);