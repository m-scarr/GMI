const drawTriangle = (context, x1, y1, x2, y2, x3, y3) => {
    context.fillStyle = "white";
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();
    context.fill();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();
};

const mouseInside = (x, y, mouseX, mouseY, entity, zoom) => {
    return (
        (mouseX - x) / zoom > entity.fields.location.x - 48 / zoom &&
        (mouseX - x) / zoom < entity.fields.location.x + 48 / zoom &&
        (mouseY - y) / zoom > entity.fields.location.y - 96 / zoom &&
        (mouseY - y) / zoom < entity.fields.location.y
    )
}

const drawMarker = (context, entity, x, y, zoom, hover) => {
    if (!hover) {
        context.save();
        context.imageSmoothingEnabled = false;
        context.drawImage(
            entity.marker,
            entity.fields.location.x * zoom + x - 48,
            entity.fields.location.y * zoom + y - 104,
            96,
            96
        );
        drawTriangle(
            context,
            entity.fields.location.x * zoom + x,
            entity.fields.location.y * zoom + y,
            entity.fields.location.x * zoom + x - 8,
            entity.fields.location.y * zoom + y - 8,
            entity.fields.location.x * zoom + x + 8,
            entity.fields.location.y * zoom + y - 8
        );
        context.restore();
    } else {
        context.save();
        context.shadowColor = "white";
        context.shadowBlur = 5;
        drawText(context, entity.fields.name, entity.fields.location.x, entity.fields.location.y, x, y, zoom);
        context.imageSmoothingEnabled = false;
        context.drawImage(
            entity.marker,
            entity.fields.location.x * zoom + x - 56,
            entity.fields.location.y * zoom + y - 120,
            112,
            112
        );
        drawTriangle(
            context,
            entity.fields.location.x * zoom + x,
            entity.fields.location.y * zoom + y,
            entity.fields.location.x * zoom + x - 8,
            entity.fields.location.y * zoom + y - 8,
            entity.fields.location.x * zoom + x + 8,
            entity.fields.location.y * zoom + y - 8
        );
        context.restore();
    }
}

const drawText = (context, text, x, y, mapX, mapY, zoom) => {
    context.save();
    context.imageSmoothingEnabled = false;
    context.font = "32px VT323";
    context.textAlign = "center";
    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.strokeText(
        text,
        x * zoom + mapX,
        y * zoom + mapY - 136
    );
    context.fillStyle = "white";
    context.fillText(
        text,
        x * zoom + mapX,
        y * zoom + mapY - 136
    );
    context.restore();
}

const draw = (map) => {
    const context = map.canvasRef.current.getContext("2d");
    context.clearRect(0, 0, map.state.width, map.state.height);
    context.imageSmoothingEnabled = true;
    context.drawImage(
        map.props.app.state.currentLocale.map,
        map.state.x,
        map.state.y,
        map.props.app.state.currentLocale.map.width * map.state.zoom,
        map.props.app.state.currentLocale.map.height * map.state.zoom
    );
    map.props.app.state.markerEntities.forEach((entity) => {
        if (map.props.app.state.droppingMarker !== entity) {
            if (mouseInside(map.state.x, map.state.y, map.state.mouseX, map.state.mouseY, entity, map.state.zoom)) {
                if (map.state.hoverEntity !== null && map.state.hoverEntity !== entity) {
                    drawMarker(context, entity, map.state.x, map.state.y, map.state.zoom, false);
                } else if (map.state.hoverEntity === null){
                    map.setState({ hoverEntity: entity });
                }
            } else {
                drawMarker(context, entity, map.state.x, map.state.y, map.state.zoom, false);
            }
        }
    })
    if (map.state.hoverEntity !== null && !mouseInside(map.state.x, map.state.y, map.state.mouseX, map.state.mouseY, map.state.hoverEntity, map.state.zoom)) {
        map.setState({ hoverEntity: null });
    } else if (map.state.hoverEntity !== null) {
        drawMarker(context, map.state.hoverEntity, map.state.x, map.state.y, map.state.zoom, true);
    }
    if (map.props.app.state.droppingMarker !== null) {
        drawText(context, "<<right click to place marker>>", map.state.mouseX, map.state.mouseY, 0, 0, 1);
        context.imageSmoothingEnabled = false;
        context.drawImage(
            map.props.app.state.droppingMarker.marker,
            map.state.mouseX - 48,
            map.state.mouseY - 104,
            96,
            96
        );
        drawTriangle(
            context,
            map.state.mouseX,
            map.state.mouseY,
            map.state.mouseX - 8,
            map.state.mouseY - 8,
            map.state.mouseX + 8,
            map.state.mouseY - 8
        );
    }
}

export default draw;