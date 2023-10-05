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
            if (map.state.hoverEntity !== null) {
                functions.goTo(map.state.hoverEntity);
                map.props.app.set("currentEntity", map.state.hoverEntity);
            }
            map.setState({
                clicked: true,
                clickX: map.state.mouseX - map.state.x,
                clickY: map.state.mouseY - map.state.y,
            })
        } else if (e.nativeEvent.which === 3) {
            if (map.props.app.droppingMarker !== null) {
                map.props.app.droppingMarker.set("location", {
                    locale: map.props.app.currentLocale,
                    x: (map.state.mouseX - map.state.x) / map.state.zoom,
                    y: (map.state.mouseY - map.state.y) / map.state.zoom,
                });
                map.props.app.set("droppingMarker", null);
            }
        }
    },
    handleWheel: (map, e) => {
        map.setState({
            zoom: map.state.zoom * (1 - e.nativeEvent.deltaY / Math.abs(e.nativeEvent.deltaY) / 8),
            x: map.state.mouseX - (map.state.mouseX - map.state.x) * (1 - e.nativeEvent.deltaY / Math.abs(e.nativeEvent.deltaY) / 8),
            y: map.state.mouseY - (map.state.mouseY - map.state.y) * (1 - e.nativeEvent.deltaY / Math.abs(e.nativeEvent.deltaY) / 8),
        })
    },
    goToEntity: (map, destination) => {
        map.props.app.set("currentLocale", destination.fields.location.locale);
        if (
            getDistance(
                map.state.x,
                map.state.y,
                map.state.width / 2 - destination.fields.location.x * map.state.zoom,
                map.state.height / 2 - destination.fields.location.y * map.state.zoom
            ) > 3
        ) {
            if (!map.state.clicked) {
                map.setState({
                    x: map.state.x - (map.state.x - (map.state.width / 2 - destination.fields.location.x * map.state.zoom)) / 5,
                    y: map.state.y - (map.state.y - (map.state.height / 2 - destination.fields.location.y * map.state.zoom)) / 5,
                    timeout: setTimeout(() => {
                        functions.goTo(map, destination);
                    }, 16)
                })
            } else {
                clearTimeout(map.state.timeout);
                this.setState({
                    x: map.state.width / 2 - destination.fields.location.x * map.state.zoom,
                    y: map.state.height / 2 - destination.fields.location.y * map.state.zoom,
                    timeout: null
                })
            }
        } else {
            clearTimeout(map.state.timeout);
            this.setState({
                x: map.state.width / 2 - destination.fields.location.x * map.state.zoom,
                y: map.state.height / 2 - destination.fields.location.y * map.state.zoom,
                timeout: null
            })
        }
    },
    goTo: (map, locale, x, y) => {
        functions.goToEntity(map, { fields: { location: { locale, x, y } } })
    }
}
export default functions;