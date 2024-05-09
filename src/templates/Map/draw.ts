const tempMap = new Image();
tempMap.src = "./assets/defaultMap.jpeg";

export const draw = (state: any, setState: Function) => {
    const context = state.canvasRef.current.getContext("2d");
    context.clearRect(0, 0, state.width, state.height);
    context.imageSmoothingEnabled = true;
    context.drawImage(
        tempMap,
        state.mapX,
        state.mapY,
        tempMap.width * state.zoomFactor,
        tempMap.height * state.zoomFactor
    );
}
