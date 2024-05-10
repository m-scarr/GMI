import AppState from "../../state/AppState";
import Entity from "../../state/Entity";
import Game from "../../state/Game";
import { Category, VisibleEntity } from "../../state/types";

const tempMap = new Image();
tempMap.src = "./assets/defaultMap.jpeg";

const drawTriangle = (
    context: any,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
) => {
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

const mouseInside = (
    x: number,
    y: number,
    mouseX: number,
    mouseY: number,
    entity: VisibleEntity,
    zoomFactor: number
) => {
    if (entity.location.x !== null && entity.location.y !== null) {
        return (
            (mouseX - x) / zoomFactor > entity.location.x - 48 / zoomFactor &&
            (mouseX - x) / zoomFactor < entity.location.x + 48 / zoomFactor &&
            (mouseY - y) / zoomFactor > entity.location.y - 96 / zoomFactor &&
            (mouseY - y) / zoomFactor < entity.location.y
        );
    } else {
        return false;
    }
};

const drawMarker = (
    context: any,
    entity: VisibleEntity,
    x: number,
    y: number,
    zoomFactor: number,
    hover: boolean
) => {
    if (entity.location.x !== null && entity.location.y !== null) {
        if (!hover) {
            context.save();
            context.imageSmoothingEnabled = false;
            context.drawImage(
                entity.marker,
                entity.location.x * zoomFactor + x - 48,
                entity.location.y * zoomFactor + y - 104,
                96,
                96
            );
            drawTriangle(
                context,
                entity.location.x * zoomFactor + x,
                entity.location.y * zoomFactor + y,
                entity.location.x * zoomFactor + x - 8,
                entity.location.y * zoomFactor + y - 8,
                entity.location.x * zoomFactor + x + 8,
                entity.location.y * zoomFactor + y - 8
            );
            context.restore();
        } else {
            context.save();
            context.shadowColor = "white";
            context.shadowBlur = 5;
            drawText(
                context,
                entity.name,
                entity.location.x,
                entity.location.y,
                x,
                y - 28,
                zoomFactor
            );
            context.imageSmoothingEnabled = false;
            context.drawImage(
                entity.marker,
                entity.location.x * zoomFactor + x - 72,
                entity.location.y * zoomFactor + y - 152,
                144,
                144
            );
            drawTriangle(
                context,
                entity.location.x * zoomFactor + x,
                entity.location.y * zoomFactor + y,
                entity.location.x * zoomFactor + x - 8,
                entity.location.y * zoomFactor + y - 8,
                entity.location.x * zoomFactor + x + 8,
                entity.location.y * zoomFactor + y - 8
            );
            context.restore();
        }
    }
};

const drawText = (
    context: any,
    text: string,
    x: number,
    y: number,
    mapX: number,
    mapY: number,
    zoomFactor: number
) => {
    context.save();
    context.imageSmoothingEnabled = false;
    context.font = "32px VT323";
    context.textAlign = "center";
    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.strokeText(text, x * zoomFactor + mapX, y * zoomFactor + mapY - 136);
    context.fillStyle = "white";
    context.fillText(text, x * zoomFactor + mapX, y * zoomFactor + mapY - 136);
    context.restore();
};

export const draw = (state: any, setState: Function) => {
    const context = state.canvasRef.current.getContext("2d");
    context.clearRect(0, 0, state.width, state.height);
    context.imageSmoothingEnabled = true;
    context.drawImage(
        AppState.instance.currentLocale!.map,
        state.mapX,
        state.mapY,
        AppState.instance.currentLocale!.map.width * state.zoomFactor,
        AppState.instance.currentLocale!.map.height * state.zoomFactor
    );
    [
        ...Game.instance![Category.Hero].list,
        ...Game.instance![Category.NPC].list,
        ...Game.instance![Category.Enemy].list,
        ...Game.instance![Category.Group].list,
        ...Game.instance![Category.Cache].list,
        ...Game.instance![Category.Battlefield].list,
        ...Game.instance![Category.Locale].list,
        ...Game.instance![Category.Event].list,
    ].forEach((entity: VisibleEntity) => {
        if (AppState.instance.droppingMarker !== entity && Entity.isVisible(entity)) {
            if (
                mouseInside(
                    state.mapX,
                    state.mapY,
                    state.mouseX,
                    state.mouseY,
                    entity,
                    state.zoomFactor
                )
            ) {
                if (
                    state.hoverEntity !== null &&
                    state.hoverEntity !== entity
                ) {
                    drawMarker(
                        context,
                        entity,
                        state.mapX,
                        state.mapY,
                        state.zoomFactor,
                        false
                    );
                } else if (state.hoverEntity === null) {
                    setState({ hoverEntity: entity });
                }
            } else {
                drawMarker(
                    context,
                    entity,
                    state.mapX,
                    state.mapY,
                    state.zoomFactor,
                    false
                );
            }
        }
    });
    if (
        state.hoverEntity !== null &&
        !mouseInside(
            state.mapX,
            state.mapY,
            state.mouseX,
            state.mouseY,
            state.hoverEntity,
            state.zoomFactor
        )
    ) {
        setState({ hoverEntity: null });
    } else if (state.hoverEntity !== null) {
        drawMarker(
            context,
            state.hoverEntity,
            state.mapX,
            state.mapY,
            state.zoomFactor,
            true
        );
    }
    if (AppState.instance.droppingMarker !== null) {
        drawText(
            context,
            "<<right click to place marker>>",
            state.mouseX,
            state.mouseY,
            0,
            0,
            1
        );
        context.imageSmoothingEnabled = false;
        context.drawImage(
            AppState.instance.droppingMarker.marker,
            state.mouseX - 48,
            state.mouseY - 104,
            96,
            96
        );
        drawTriangle(
            context,
            state.mouseX,
            state.mouseY,
            state.mouseX - 8,
            state.mouseY - 8,
            state.mouseX + 8,
            state.mouseY - 8
        );
    }
}
