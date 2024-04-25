import { ReactNode } from "react";

type Props = { hoverable?: boolean,  children?: ReactNode; }

export default function Button(props: Props) {
    return (
        <div>
            {props.children}
        </div>
    )
}