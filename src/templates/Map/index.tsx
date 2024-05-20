import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { draw } from './draw';
import control, { getDistance } from './control';
import { Category, VisibleEntity } from '../../state/types';
import AppState, { wait } from '../../state/AppState';
import Game from '../../state/Game';

type Props = {}

function Map({ }: Props) {
    const canvasRef = useRef(null);
    const titleDivRef = useRef<any>(null);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const [mapX, setMapX] = useState<number>(0);
    const [mapY, setMapY] = useState<number>(0);
    const [destX, setDestX] = useState<number | null>(null);
    const [destY, setDestY] = useState<number | null>(null);
    const [zoomFactor, setZoomFactor] = useState<number>(1);
    const [zoomFactorGoal, setZoomFactorGoal] = useState<number | null>(null);
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const [clickX, setClickX] = useState<number>(0);
    const [clickY, setClickY] = useState<number>(0);
    const [clicked, setClicked] = useState<boolean>(false);
    const [hoverEntity, setHoverEntity] = useState<VisibleEntity | null>(null);
    const switchCase: { [key: string]: any } = {
        "canvasRef": [canvasRef, (val: any) => { canvasRef.current = val; }],
        "width": [width, setWidth],
        "height": [height, setHeight],
        "mapX": [mapX, setMapX],
        "mapY": [mapY, setMapY],
        "destX": [destX, setDestX],
        "destY": [destY, setDestY],
        "zoomFactor": [zoomFactor, setZoomFactor],
        "mouseX": [mouseX, setMouseX],
        "mouseY": [mouseY, setMouseY],
        "clickX": [clickX, setClickX],
        "clickY": [clickY, setClickY],
        "clicked": [clicked, setClicked],
        "hoverEntity": [hoverEntity, setHoverEntity],
    };

    const setState = (obj: any) => {
        Object.keys(obj).forEach((key: string) => {
            switchCase[key][1](obj[key]);
        });
    }

    const getState = () => {
        const retObj: any = {};
        Object.keys(switchCase).forEach((key: string) => {
            retObj[key] = switchCase[key][0];
        });
        return retObj;
    }

    useEffect(() => {
        (async () => {
            if (AppState.instance.goToEntity && AppState.instance.goToEntity.location.localeId !== null) {
                setDestX(-AppState.instance.goToEntity.location.x);
                setDestY(-AppState.instance.goToEntity.location.y);
                const localeId = AppState.instance.goToEntity.location.localeId;
                await wait(10);
                AppState.instance.currentLocale = Game.instance!.findEntity(Category.Locale, localeId);
            }
        })()
    }, [AppState.instance.goToEntity]);

    useEffect(() => {
        if (AppState.instance.currentLocale !== null) {
            draw(getState(), setState);
        }
        if (destX && destY) {
            var centerX = width / 2;
            var centerY = height / 2;
            if (
                getDistance(
                    mapX,
                    mapY,
                    destX * zoomFactor + centerX,
                    destY * zoomFactor + centerY
                ) >= 1
            ) {
                setMapX(mapX - (mapX - (destX * zoomFactor + centerX)) / 5);
                setMapY(mapY - (mapY - (destY * zoomFactor + centerY)) / 5);
            } else {
                setDestX(null);
                setDestY(null);
                setMapX(destX * zoomFactor + centerX);
                setMapY(destY * zoomFactor + centerY);
            }
        }
        if (zoomFactorGoal && Math.abs(zoomFactor - zoomFactorGoal) > .05) {
            setZoomFactor(zoomFactorGoal + (zoomFactor < zoomFactorGoal ? .01 : -.01));
        } else if (zoomFactorGoal) {
            setZoomFactor(zoomFactorGoal!);
            setZoomFactorGoal(null);
        }
    }, [AppState.instance.tick]);

    window.addEventListener('resize', () => {
        setWidth(window.innerWidth - (AppState.instance.showMenu ? AppState.instance.menuWidth : 0));
        setHeight(window.innerHeight);
    });

    useEffect(() => {
        setWidth(window.innerWidth - (AppState.instance.showMenu ? AppState.instance.menuWidth : 0));
        setMapX(mapX + (AppState.instance.showMenu ? -320 : 320));
    }, [AppState.instance.showMenu])

    const center = () => {
        let mapRatio = AppState.instance.currentLocale!.map.width / AppState.instance.currentLocale!.map.height;
        let appRatio = width / height;
        let newWidth = width;
        let newHeight = height;
        if (mapRatio > appRatio) {
            newHeight = newWidth / mapRatio;
        } else {
            newWidth = newHeight * mapRatio;
        }
        setZoomFactorGoal(newWidth / AppState.instance.currentLocale!.map.width);
        setDestX(-AppState.instance.currentLocale!.map.width / 2);
        setDestY(-AppState.instance.currentLocale!.map.height / 2);
    }

    useEffect(() => {
        if (AppState.instance.currentLocale && destX === null && destY === null) {
            center();
        }
    }, [AppState.instance.currentLocale])

    return (
        <>

            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{
                    backgroundColor: "rgb(48, 48, 48)",
                    position: "fixed",
                    left: AppState.instance.showMenu ? AppState.instance.menuWidth : 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }}
                onContextMenu={(e: any) => {
                    if (AppState.instance.droppingMarker !== null) {
                        e.preventDefault();
                    }
                }}
                onMouseDown={(e: any) => {
                    control.mouseDown(e, getState(), setState);
                }}
                onMouseUp={(e: any) => {
                    control.mouseUp(e, getState(), setState);
                }}
                onMouseMove={(e: any) => {
                    control.mouseMove(e, getState(), setState);
                }}
                onMouseEnter={(e: any) => {
                    control.mouseEnter(e, getState(), setState);
                }}
                onMouseLeave={(e: any) => {
                    control.mouseLeave(e, getState(), setState);
                }}
                onMouseOut={(e: any) => {
                    control.mouseOut(e, getState(), setState);
                }}
                onWheel={(e: any) => {
                    control.mouseWheel(e, getState(), setState);
                }}
            />
            <div ref={titleDivRef} style={{ position: "fixed", top: 0, left: (AppState.instance.showMenu ? 320 : 0) + width / 2 - (titleDivRef.current ? titleDivRef.current!.clientWidth / 2 : 16)/* 16 should be div width / 2*/ }}>{AppState.instance.currentLocale?.name}
                <img alt="" src="./assets/center.png" style={{ transform: "translateX(32px) translateY(8px)" }} onClick={center} /></div>
        </>
    )
}

export default observer(Map);