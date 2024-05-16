export default class InputManager {
    private static _idCount: number = 0;
    private static _idleTimers: any = {};

    public static createTimer(time: number, value: any, callback: (val: any) => void) {
        this._idCount++;
        const id: string = this._idCount.toString();
        this._idleTimers[id] = {};
        this._idleTimers[id].time = time;
        this._idleTimers[id].value = value;
        this._idleTimers[id].callback = callback;
        return id;
    }

    public static setTimer(id: string, time: number, value: any) {
        this._idleTimers[id].time = time;
        this._idleTimers[id].value = value;
    }

    public static decrementTimers(time: number) {
        Object.keys(this._idleTimers).forEach((id: string) => {
            this._idleTimers[id].time -= time;
            if (this._idleTimers[id].time < 1) {
                this._idleTimers[id].callback(this._idleTimers[id].value);
                delete this._idleTimers[id];
            }
        })
    }
}