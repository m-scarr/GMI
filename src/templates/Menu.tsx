import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react'
import AppState from '../state/AppState';
import MenuHeader from '../components/MenuHeader';
import SearchBar from "../components/SearchBar";

type Props = {}

function Menu({ }: Props) {
    const [showMenuHover, setShowMenuHover] = useState<boolean>(false);
    const [contentTop, setContentTop] = useState<number>(400);
    const contentRef = useRef<any>(null);
    useEffect(() => {
        if (contentRef.current) {
            setContentTop(contentRef.current.getBoundingClientRect().top + 2)
        }
    }, [contentRef.current])
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
                <div ref={contentRef} style={{ width: "calc(100% - 2px)", height: window.innerHeight - contentTop }}>

                </div>
            </div>
            : null}<img style={{
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