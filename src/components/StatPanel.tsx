import { observer } from 'mobx-react-lite';
import AppState from '../state/AppState';
import Stat from '../state/Stat';
import Button from './Button';
import { useEffect, useState } from 'react';
import TextInput from './inputs/TextInput';

type Props = {}

function StatPanel({ }: Props) {
  const [writingStat, setWritingStat] = useState<boolean>(false);
  const [statName, setStatName] = useState<string>("");
  const [statValue, setStatValue] = useState<string>("");
  const [entity, setEntity] = useState<any>(AppState.instance.currentEntity);
  useEffect(() => {
    setEntity(AppState.instance.currentEntity);
  }, [AppState.instance.currentEntity])

  return (typeof entity.currency === "undefined" || !entity.currency ? (
    <Button>
      <div style={{ marginBottom: 8 }}>
        {writingStat ?
          <div style={{ position: "relative" }}>
            <div className='hoverable' style={{ position: "absolute", left: 0, top: -6, paddingBottom: 8, transform: "translateX(-6px)" }}
              onClick={() => {
                setWritingStat(false);
                setStatName("");
                setStatValue("");
              }}>
              <img alt="" src="./assets/back.png" style={{ transform: "translateY(8px)" }} />
            </div>
          </div>
          : null}
        Stats
      </div>
      {writingStat ?
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 250 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>Name<TextInput value={statName} onInput={setStatName} fontSize={20} minRows={5} /></div>
          <div style={{ transform: "translateY(12px)" }}>:</div>
          <div style={{ display: "flex", flexDirection: "column" }}>Value<TextInput value={statValue} onInput={setStatValue} fontSize={20} minRows={5} /></div>
        </div> :
        <div style={{ height: 250, overflowY: "scroll", overflowX: "hidden", margin: 0, padding: 0, transform: "translateX(-6px)", width: "calc(100% + 11px)", fontSize: 24 }}>
          {entity.stats.list.map((stat: Stat) => {
            return <IndividualStat key={"stat-" + stat.id} stat={stat} />
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
          if (writingStat && statName !== "" && statValue !== "") {
            Stat.create(entity.id, statName, statValue);
          }
          setStatName("");
          setStatValue("");
          setWritingStat(!writingStat);
        }}>
        Create New Stat
      </div>
    </Button >
  ) : null)
}

function IndividualStat(props: { stat: Stat }) {
  const [statName, setStatName] = useState<string>(props.stat.name);
  const [statValue, setStatValue] = useState<string>(props.stat.value);
  return (
    <Button key={'stat-' + props.stat.id}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div>
          <TextInput value={statName} onInput={setStatName} fontSize={20} onIdle={(val: string) => { props.stat.name = val; }} />
        </div>
        :
        <div>
          <TextInput value={statValue} onInput={setStatValue} fontSize={20} onIdle={(val: string) => { props.stat.value = val; }} />
        </div>
        <div className="hoverable" style={{ alignSelf: "stretch", alignContent: "center", padding: 1 }} onClick={() => { props.stat.delete(); }}>
          <img alt="Delete Stat" src="./assets/trashcan.png" />
        </div>
      </div>
    </Button>
  )
}

export default observer(StatPanel);