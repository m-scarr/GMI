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

var found
const mapImg = new Image();
mapImg.src = "./assets/defaultMap.jpeg"

const drawing = (canvasRef, width, height, app, x, y, zoom, mouseX, mouseY, hoverEntity) => {
    console.log(app.state.currentLocale)
    const context = canvasRef.getContext("2d");
    context.clearRect(0, 0, width, height);
    context.drawImage(
        app.state.currentLocale.map,
        x,
        y,
        app.state.currentLocale.map.width * zoom,
        app.state.currentLocale.map.height * zoom
    );
    found = false;
    if (typeof app.markerEntities !== "undefined") {
        app.markerEntities.forEach((entity) => {
            if (app.droppingMarker !== entity) {
                if (
                    (mouseX - x) / zoom > entity.localeX - 48 / zoom &&
                    (mouseX - x) / zoom < entity.localeX + 48 / zoom &&
                    (mouseY - y) / zoom > entity.localeY - 96 / zoom &&
                    (mouseY - y) / zoom < entity.localeY
                ) {
                    found = true;
                    if (hoverEntity === null) {
                        hoverEntity = entity;
                    }
                    if (hoverEntity !== entity) {
                        context.imageSmoothingEnabled = false;
                        context.drawImage(
                            entity.marker,
                            entity.localeX * zoom + x - 48,
                            entity.localeY * zoom + y - 104,
                            96,
                            96
                        );
                        drawTriangle(
                            context,
                            entity.localeX * zoom + x,
                            entity.localeY * zoom + y,
                            entity.localeX * zoom + x - 8,
                            entity.localeY * zoom + y - 8,
                            entity.localeX * zoom + x + 8,
                            entity.localeY * zoom + y - 8
                        );
                        context.imageSmoothingEnabled = true;
                    }
                } else if (hoverEntity !== entity) {
                    context.imageSmoothingEnabled = false;
                    context.drawImage(
                        entity.marker,
                        entity.localeX * zoom + x - 48,
                        entity.localeY * zoom + y - 104,
                        96,
                        96
                    );
                    drawTriangle(
                        context,
                        entity.localeX * zoom + x,
                        entity.localeY * zoom + y,
                        entity.localeX * zoom + x - 8,
                        entity.localeY * zoom + y - 8,
                        entity.localeX * zoom + x + 8,
                        entity.localeY * zoom + y - 8
                    );
                    context.imageSmoothingEnabled = true;
                }
            }
        });
    }
    if (
        !found ||
        !(
            (mouseX - x) / zoom > hoverEntity.localeX - 48 / zoom &&
            (mouseX - x) / zoom < hoverEntity.localeX + 48 / zoom &&
            (mouseY - y) / zoom > hoverEntity.localeY - 96 / zoom &&
            (mouseY - y) / zoom < hoverEntity.localeY
        )
    ) {
        hoverEntity = null;
    }
    if (hoverEntity !== null) {
        context.save();
        context.shadowColor = "white";
        context.shadowBlur = 5;
        context.imageSmoothingEnabled = false;
        context.font = "32px VT323";
        context.textAlign = "center";
        context.lineWidth = 4;
        context.strokeStyle = "black";
        context.strokeText(
            hoverEntity.name,
            hoverEntity.localeX * zoom + x,
            hoverEntity.localeY * zoom + y - 136
        );
        context.fillstyle = "white";
        context.fillText(
            hoverEntity.name,
            hoverEntity.localeX * zoom + x,
            hoverEntity.localeY * zoom + y - 136
        );
        context.drawImage(
            hoverEntity.marker,
            hoverEntity.localeX * zoom + x - 56,
            hoverEntity.localeY * zoom + y - 120,
            112,
            112
        );
        drawTriangle(
            context,
            hoverEntity.localeX * zoom + x,
            hoverEntity.localeY * zoom + y,
            hoverEntity.localeX * zoom + x - 8,
            hoverEntity.localeY * zoom + y - 8,
            hoverEntity.localeX * zoom + x + 8,
            hoverEntity.localeY * zoom + y - 8
        );
        context.restore();
    }
    /*if (app.droppingMarker !== null) {
        context.imageSmoothingEnabled = false;
        context.drawImage(
            app.droppingMarker.marker,
            mouseX - 48,
            mouseY - 104,
            96,
            96
        );
        drawTriangle(
            context,
            mouseX,
            mouseY,
            mouseX - 8,
            mouseY - 8,
            mouseX + 8,
            mouseY - 8
        );
        context.imageSmoothingEnabled = true;
    }*/
}

export default drawing;