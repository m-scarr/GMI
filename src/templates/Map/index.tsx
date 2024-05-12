import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { draw } from './draw';
import control, { getDistance } from './control';
import { Category, VisibleEntity } from '../../state/types';
import AppState from '../../state/AppState';
import Game from '../../state/Game';

type Props = {}

function Map({ }: Props) {
    const canvasRef = useRef(null);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const [mapX, setMapX] = useState<number>(0);
    const [mapY, setMapY] = useState<number>(0);
    const [destX, setDestX] = useState<number | null>(null);
    const [destY, setDestY] = useState<number | null>(null);
    const [zoomFactor, setZoomFactor] = useState<number>(1);
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const [clickX, setClickX] = useState<number>(0);
    const [clickY, setClickY] = useState<number>(0);
    const [clicked, setClicked] = useState<boolean>(false);
    const [hoverEntity, setHoverEntity] = useState<VisibleEntity | null>(null);
    const [movementActive, setMovementActive] = useState<boolean>(false);
    const intervalRef = useRef<any>(null);

    const switchCase: { [key: string]: any } = {
        "canvasRef": [canvasRef, (val: any) => { canvasRef.current = val; }],
        "intervalRef": [intervalRef.current, (val: any) => { intervalRef.current = val; }],
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
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [])

    useEffect(() => {
        if (AppState.instance.currentLocale !== null) {
            draw(getState(), setState);
        }
    }, [width, height, mapX, mapY, zoomFactor, mouseX, mouseY, clickX, clickY]);

    useEffect(() => {
        if (AppState.instance.goToEntity && AppState.instance.goToEntity.location.localeId !== null) {
            AppState.instance.currentLocale = Game.instance!.findEntity(Category.Locale, AppState.instance.goToEntity.location.localeId);
            setDestX(-AppState.instance.goToEntity.location.x);
            setDestY(-AppState.instance.goToEntity.location.y);
        }
    }, [AppState.instance.goToEntity]);

    useEffect(() => {
        if (destX && destY && intervalRef.current === null) {
            intervalRef.current = setInterval(() => {
                setMovementActive(true);
            }, 16);
        }
    }, [destX])

    useEffect(() => {
        if (movementActive && destX && destY) {
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
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setMovementActive(false);
        }
    }, [movementActive]);

    window.addEventListener('resize', () => {
        setWidth(window.innerWidth - (AppState.instance.showMenu ? AppState.instance.menuWidth : 0));
        setHeight(window.innerHeight);
    });

    useEffect(() => {
        setWidth(window.innerWidth - (AppState.instance.showMenu ? AppState.instance.menuWidth : 0));
        setMapX(mapX + (AppState.instance.showMenu ? -320 : 320));
    }, [AppState.instance.showMenu])

    return (
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
            onContextMenu={(e: any) => {
                if (AppState.instance.droppingMarker !== null) {
                    e.preventDefault();
                }
            }}
        />
    )
}

export default observer(Map);