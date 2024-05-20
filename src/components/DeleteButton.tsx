import AppState from "../state/AppState";
import Button from "./Button";
import { useEffect, useState } from "react";
import { Category } from "../state/types";
import Game from "../state/Game";

export default function DeleteButton() {
    const [entity, setEntity] = useState<any>(AppState.instance.currentEntity as any);

    useEffect(() => {
        setEntity(AppState.instance.currentEntity as any);
    }, [AppState.instance.currentEntity]);

    return entity.category === Category.Locale && Game.instance!.overworldLocale!.id === entity.id ? null : (
        <Button hoverable={true} onClick={() => {
            entity.delete();
        }}>Delete</Button>
    )
}