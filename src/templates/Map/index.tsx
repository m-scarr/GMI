import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { draw } from './draw';
import control from './control';
import { VisibleEntity } from '../../state/types';

type Props = {}

function Map({ }: Props) {
    const canvasRef = useRef(null);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const [mapX, setMapX] = useState<number>(0);
    const [mapY, setMapY] = useState<number>(0);
    const [zoomFactor, setZoomFactor] = useState<number>(1);
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const [clickX, setClickX] = useState<number>(0);
    const [clickY, setClickY] = useState<number>(0);
    const [clicked, setClicked] = useState<boolean>(false);
    const [hoverEntity, setHoverEntity] = useState<VisibleEntity | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const switchCase: { [key: string]: any } = {
        "canvasRef": [canvasRef, (val: any) => { canvasRef.current = val; }],
        "width": [width, setWidth],
        "height": [height, setHeight],
        "mapX": [mapX, setMapX],
        "mapY": [mapY, setMapY],
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
        const drawLoop = () => {
            draw(getState(), setState);
            animationFrameRef.current = requestAnimationFrame(() => { drawLoop(); });
        }
        drawLoop();
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        }
    }, [width, height, mapX, mapY, zoomFactor, mouseX, mouseY, clickX, clickY]);

    window.addEventListener('resize', () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    });

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ backgroundColor: "rgb(48, 48, 48)", position: "fixed", left: 0, right: 0, top: 0, bottom: 0 }}
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
    )
}

export default observer(Map);