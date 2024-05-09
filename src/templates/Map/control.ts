export default {
    mouseDown: (e: any, state: any, setState: (obj: any) => void) => {
        if (e.nativeEvent.button === 0) {
            /*if (
                state.hoverEntity &&
                state.hoverEntity !== null &&
                state.timeout == null
            ) {
                map.goToEntity(map.state.hoverEntity);
                App.instance.setCurrentEntity(map.state.hoverEntity);
            } else {*/
            setState({
                clicked: true,
                clickX: state.mouseX - state.mapX,
                clickY: state.mouseY - state.mapY,
            });
            //}
        } /*else if (
            e.nativeEvent.button === 2 &&
            App.instance.droppingMarker !== null
          ) {
            App.instance.droppingMarker.setLocation({
              locale: App.instance.currentLocale,
              mapX: (map.state.mouseX - map.state.mapX) / map.state.zoomFactor,
              mapY: (map.state.mouseY - map.state.mapY) / map.state.zoomFactor,
            });
            App.instance.droppingMarker = null;
          }*/
    },
    mouseUp: (e: any, state: any, setState: (obj: any) => void) => {
        setState({ clicked: false });
    },
    mouseMove: (e: any, state: any, setState: (obj: any) => void) => {
        setState({
            mouseX: e.nativeEvent.offsetX * window.devicePixelRatio,
            mouseY: e.nativeEvent.offsetY * window.devicePixelRatio,
        });
        if (state.clicked) {
            setState({
                mapX: state.mouseX - state.clickX,
                mapY: state.mouseY - state.clickY,
            });
        }
    },
    mouseEnter: (e: any, state: any, setState: (obj: any) => void) => {
        setState({
            mouseX: e.nativeEvent.offsetX * window.devicePixelRatio,
            mouseY: e.nativeEvent.offsetY * window.devicePixelRatio,
        });
    },
    mouseLeave: (e: any, state: any, setState: (obj: any) => void) => {
        setState({ clicked: false });
    },
    mouseOut: (e: any, state: any, setState: (obj: any) => void) => {
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