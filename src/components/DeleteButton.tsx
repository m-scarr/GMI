import AppState from "../state/AppState";
import Button from "./Button";

export default function DeleteButton() {
    return (
        <Button hoverable={true} onClick={()=>{
            AppState.instance.currentEntity!.delete();
        }}>Delete</Button>
    )
}