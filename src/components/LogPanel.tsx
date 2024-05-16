import { observer } from 'mobx-react-lite';
import AppState from '../state/AppState';
import Log from '../state/Log';
import Button from './Button';
import { useState } from 'react';
import TextInput from './inputs/TextInput';

type Props = {}

function LogPanel({ }: Props) {
    const [writingLog, setWritingLog] = useState<boolean>(false);
    const [logText, setLogText] = useState<string>("");
    return (
        <Button>
            <div style={{ marginBottom: 8 }}>
                {writingLog ?
                    <div style={{ position: "relative" }}>
                        <div className='hoverable' style={{ position: "absolute", left: 0, top: -6, paddingBottom: 8, transform: "translateX(-6px)" }} onClick={() => {
                            setWritingLog(false);
                            setLogText("");
                        }}>
                            <img alt="" src="./assets/back.png" style={{ transform: "translateY(8px)" }} />
                        </div>
                    </div>
                    : null}
                Logs
            </div>
            {writingLog ? <TextInput value={logText} onInput={setLogText} fontSize={24} minRows={10} /> :
                <div style={{ height: 250, overflowY: "scroll", overflowX: "hidden", margin: 0, padding: 0, transform: "translateX(-6px)", width: "calc(100% + 11px)", fontSize: 24 }}>
                    {(AppState.instance.currentEntity as any).logs.list.map((log: Log) => {
                        return <IndividualLog key={"log-" + log.id} log={log} />
                    })}
                </div>}
            <div
                className="hoverable"
                style={{
                    transform: "translateX(-6px) translateY(6px)",
                    marginTop: -6,
                    paddingTop: 6,
                    paddingBottom: 6,
                    width: "calc(100% + 12px)"
                }}
                onClick={() => {
                    if (writingLog && logText !== "") {
                        Log.create(AppState.instance.currentEntity!.category, AppState.instance.currentEntity!.id, logText);
                    }
                    setLogText("");
                    setWritingLog(!writingLog);
                }}>
                Create New Log
            </div>
        </Button>
    )
}

function IndividualLog(props: { log: Log }) {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Button key={'log-' + props.log.id} onClick={() => { setOpen(!open) }} hoverable={true}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <div>
                    {props.log.createdAt}
                </div>
                <img alt="delete" src="./assets/trashcan.png" onClick={() => { props.log.delete(); }} />
            </div>
            {open ?
                <>
                    <hr style={{ transform: "translateX(-2px)", pointerEvents: "none" }} />
                    {props.log.text}
                </> : null}
        </Button>
    )
}

export default observer(LogPanel);