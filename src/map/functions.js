const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const functions = {
    handleMouseEnter: (map, e) => {
        map.setState({ mouseX: e.nativeEvent.offsetX, mouseY: e.nativeEvent.offsetY });
    },
    handleMouseMove: (map, e) => {
        map.setState({ mouseX: e.nativeEvent.offsetX, mouseY: e.nativeEvent.offsetY }, () => {
            if (map.state.clicked) {
                map.setState({ x: map.state.mouseX - map.state.clickX, y: map.state.mouseY - map.state.clickY })
            }
        });
    },
    handleMouseDown: (map, e) => {
        if (e.nativeEvent.which === 1) {
            if (typeof map.state.hoverEntity !== "undefined" && map.state.hoverEntity !== null && map.state.timeout == null) {
                map.goToEntity(map.state.hoverEntity);
                map.props.app.set("currentEntity", map.state.hoverEntity);
            } else {
                map.setState({
                    clicked: true,
                    clickX: map.state.mouseX - map.state.x,
                    clickY: map.state.mouseY - map.state.y,
                })
            }
        } else if (e.nativeEvent.which === 3 && map.props.app.state.droppingMarker !== null) {
            console.log(map.props.app.state.currentLocale)
            map.props.app.state.droppingMarker.set("location", {
                locale: map.props.app.state.currentLocale,
                x: (map.state.mouseX - map.state.x) / map.state.zoom,
                y: (map.state.mouseY - map.state.y) / map.state.zoom,
            });
            map.props.app.set("droppingMarker", null);
        }
    },
    handleWheel: (map, e) => {
        map.setState({
            zoom: map.state.zoom * (1 - e.nativeEvent.deltaY / Math.abs(e.nativeEvent.deltaY) / 8),
            x: map.state.mouseX - (map.state.mouseX - map.state.x) * (1 - e.nativeEvent.deltaY / Math.abs(e.nativeEvent.deltaY) / 8),
            y: map.state.mouseY - (map.state.mouseY - map.state.y) * (1 - e.nativeEvent.deltaY / Math.abs(e.nativeEvent.deltaY) / 8),
        })
    },
    handleMouseUp: (map) => { map.setState({ clicked: false }); },
    handleMouseOut: (map) => { map.setState({ clicked: false }); },
    goToEntity: (map, destination) => {
        console.log(map, destination);
        if (map.props.app.state.currentLocale !== destination.fields.location.locale) {
            map.props.app.set("currentLocale", destination.fields.location.locale);
        }
        var centerX = (map.props.app.state.hideMenu ? (map.state.width / 2) : (320 + ((map.state.width - 320) / 2)));
        var centerY = map.state.height / 2;
        if (
            getDistance(
                map.state.x,
                map.state.y,
                centerX - destination.fields.location.x * map.state.zoom,
                centerY - destination.fields.location.y * map.state.zoom
            ) > 3
        ) {
            map.setState({
                x: map.state.x - (map.state.x - (centerX - destination.fields.location.x * map.state.zoom)) / 5,
                y: map.state.y - (map.state.y - (centerY - destination.fields.location.y * map.state.zoom)) / 5,
            }, () => {
                clearTimeout(map.state.timeout);
                map.setState({
                    timeout: setTimeout(() => {
                        functions.goToEntity(map, destination);
                    }, 16)
                })
            })
        } else {
            clearTimeout(map.state.timeout);
            map.setState({
                x: centerX - destination.fields.location.x * map.state.zoom,
                y: centerY - destination.fields.location.y * map.state.zoom,
                timeout: null
            })
        }
    },
    goTo: (map, locale, x, y) => {
        functions.goToEntity(map, { fields: { location: { locale, x, y } } })
    }
}
export default functions;