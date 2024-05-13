import { ReactNode, useState } from "react";
import AppState from "../state/AppState";

type Props = { hoverable?: boolean, children?: ReactNode, onClick?: Function }

export default function Button(props: Props) {
    const [hover, setHover] = useState(false);

    return AppState.instance.currentCategory === null ? null : (
        <div style={{ cursor: "pointer", backgroundColor: "rgba(255, 255, 255, .1)", marginTop: 16, marginBottom: 16, borderTop: "1px solid white", borderBottom: "1px solid white" }}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onMouseOut={() => {
                setHover(false);
            }}
            onClick={() => {
                if (props.onClick) {
                    props.onClick();
                }
            }}
        >
            <div style={{ backgroundColor: `rgba(255, 255, 255, ${hover && props.hoverable ? '.15' : '0'})`, padding: 6 }}
                onMouseEnter={() => {
                    setHover(true);
                }}
                onMouseLeave={() => {
                    setHover(false);
                }}
                onMouseOut={() => {
                    setHover(false);
                }}>
                {props.children}
            </div>
        </div>
    )
}