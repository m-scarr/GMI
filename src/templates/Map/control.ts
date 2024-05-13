import AppState, { wait } from "../../state/AppState";
import Game from "../../state/Game";
import { Category, VisibleEntity } from "../../state/types";

export const getDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const controls = {
    mouseDown: (e: any, state: any, setState: (obj: any) => void) => {
        if (e.nativeEvent.button === 0) {
            if (
                state.hoverEntity &&
                state.hoverEntity !== null
            ) {
                AppState.instance.currentEntity = state.hoverEntity;
                AppState.instance.goToEntity = state.hoverEntity;
            } else if (state.destX === null && state.destY === null) {
                setState({
                    clicked: true,
                    clickX: state.mouseX - state.mapX,
                    clickY: state.mouseY - state.mapY,
                });
            }
        }
    },
    mouseUp: async (e: any, state: any, setState: (obj: any) => void) => {
        if (
            e.nativeEvent.button === 2 &&
            AppState.instance.droppingMarker !== null
        ) {
            AppState.instance.droppingMarker.location = {
                localeId: AppState.instance.currentLocale!.id,
                x: (state.mouseX - state.mapX) / state.zoomFactor,
                y: (state.mouseY - state.mapY) / state.zoomFactor
            };
            await wait(10);
            AppState.instance.droppingMarker = null;
        }
        setState({ clicked: false });
    },
    mouseMove: (e: any, state: any, setState: (obj: any) => void) => {
        setState({
            mouseX: e.nativeEvent.offsetX * window.devicePixelRatio,
            mouseY: e.nativeEvent.offsetY * window.devicePixelRatio,
        });
        if (state.clicked && state.destX === null && state.destY === null) {
            setState({
                mapX: state.mouseX - state.clickX,
                mapY: state.mouseY - state.clickY,
            });
        }
    },
    mouseEnter: (e: any, _state: any, setState: (obj: any) => void) => {
        setState({
            mouseX: e.nativeEvent.offsetX * window.devicePixelRatio,
            mouseY: e.nativeEvent.offsetY * window.devicePixelRatio,
        });
    },
    mouseLeave: (_e: any, _state: any, setState: (obj: any) => void) => {
        setState({ clicked: false });
    },
    mouseOut: (_e: any, _state: any, setState: (obj: any) => void) => {
        setState({ clicked: false });
    },
    mouseWheel: (e: any, state: any, setState: (obj: any) => void) => {
        setState({
            zoomFactor:
                state.zoomFactor *
                (1 - e.nativeEvent.deltaY / Math.abs(e.nativeEvent.deltaY) / 8),
            mapX:
                state.mouseX -
                (state.mouseX - state.mapX) *
                (1 - e.nativeEvent.deltaY / Math.abs(e.nativeEvent.deltaY) / 8),
            mapY:
                state.mouseY -
                (state.mouseY - state.mapY) *
                (1 - e.nativeEvent.deltaY / Math.abs(e.nativeEvent.deltaY) / 8),
        });
    }
}

export default controls;