import { observer } from 'mobx-react-lite';
import Button from '../Button';
import { ReactNode } from 'react';

type Props = { children?: ReactNode, value: boolean, onInput: (val: boolean) => void }

function CheckButton(props: Props) {

    return (
        <Button>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                    alt="check/uncheck"
                    src={`./assets/checkbox_${props.value ? 'filled' : 'empty'}.png`}
                    onClick={() => { props.onInput(!props.value); }}
                />
                <div style={{width: "100%"}}>
                    {props.children}
                </div>
            </div>
        </Button>
    )
}

export default observer(CheckButton);