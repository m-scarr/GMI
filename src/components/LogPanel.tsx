import { observer } from 'mobx-react-lite';
import AppState from '../state/AppState';
import Log from '../state/Log';
import Button from './Button';
import { useEffect, useState } from 'react';
import TextInput from './inputs/TextInput';

function LogPanel() {
    const [writingLog, setWritingLog] = useState<boolean>(false);
    const [logText, setLogText] = useState<string>("");
    const [entity, setEntity] = useState<any>(AppState.instance.currentEntity);
    useEffect(() => {
        setEntity(AppState.instance.currentEntity);
    }, [AppState.instance.currentEntity])
    return (typeof entity.unique === "undefined" || entity.unique ? (
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
                    {entity.logs.list.map((log: Log) => {
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
                        Log.create(entity.category, entity.id, logText);
                    }
                    setLogText("");
                    setWritingLog(!writingLog);
                }}>
                Create New Log
            </div>
        </Button>
    ) : null)
}

function IndividualLog(props: { log: Log }) {
    const [open, setOpen] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    return (
        <div style={{ cursor: "pointer", backgroundColor: "rgba(255, 255, 255, .1)", marginTop: 16, marginBottom: 16, borderTop: "1px solid white", borderBottom: "1px solid white" }}
            onClick={() => {
                setOpen(!open);
            }}
        >
            <div style={{ backgroundColor: `rgba(255, 255, 255, ${hover ? '.15' : '0'})`, padding: 6 }}
                onMouseMove={() => {
                    setHover(true);
                }}
                onMouseLeave={() => {
                    setHover(false);
                }}
                onMouseOut={() => {
                    setHover(false);
                }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <div>
                        {props.log.createdAt}
                    </div>
                    <div className='hoverable' style={{ borderRadius: 4, padding: 4 }}>
                        <img alt="delete" src="./assets/trashcan.png" onClick={() => {
                            props.log.delete();
                        }} />
                    </div>
                </div>
                {open ?
                    <>
                        <hr style={{ transform: "translateX(-2px)", pointerEvents: "none" }} />
                        {props.log.text}
                    </> : null}
            </div>
        </div>
    )
}

export default observer(LogPanel);