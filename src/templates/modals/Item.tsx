import { observer } from "mobx-react-lite";
import AppState from "../../state/AppState";
import { useEffect, useState } from "react";
import Stat from "../../state/Stat";
import Button from "../../components/Button";
import TextInput from "../../components/inputs/TextInput";

type Props = {}

function ItemModal({ }: Props) {
  const [nativeItem, setNativeItem] = useState(AppState.instance.modals.item.content);
  const [equipped, setEquipped] = useState<boolean>(AppState.instance.modals.item.equipped)
  useEffect(() => {
    setNativeItem(AppState.instance.modals.item.content);
    setEquipped(AppState.instance.modals.item.equipped);
  }, [AppState.instance.modals.item.content, AppState.instance.modals.item.equipped]);
  return (
    <div className="modal" style={{ display: "flex", flexDirection: "column", minWidth: 360, width: "calc(100% - 704px)", maxWidth: 540 }} onClick={(e: any) => {
      e.stopPropagation();
    }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}>
        <div style={{ alignSelf: "stretch", alignContent: "center" }}><img alt="" src={nativeItem.iconSrc} style={{ width: 96, imageRendering: "pixelated" }} /></div>
        <div style={{ alignSelf: "stretch", alignContent: "center", width: "100%" }}>{nativeItem.name}
          {nativeItem.unique ? <><br />-unique-</> : null}
          {nativeItem.equippable ?
            equipped ? <><br />-equipped-</> : <><br />-equippable-</>
            :
            null}
        </div>
      </div>
      {nativeItem.stats.list.length > 0 ?
        <div>
          {nativeItem.stats.list.map((stat: Stat) => {
            return <IndividualStat key={"stat-" + stat.id} stat={stat} />
          })}
        </div> : null}
      {nativeItem.notes !== "" ?
        <div>
          {nativeItem.notes}
        </div> : null}
    </div >
  )
}

export default observer(ItemModal);

function IndividualStat(props: { stat: Stat }) {
  return (
    <Button key={'stat-' + props.stat.id}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div style={{ width: "50%" }}>
          <TextInput value={props.stat.name} onInput={() => { }} fontSize={20} />
        </div>
        :
        <div style={{ width: "50%" }}>
          <TextInput value={props.stat.value} onInput={() => { }} fontSize={20} />
        </div>
      </div>
    </Button>
  )
}