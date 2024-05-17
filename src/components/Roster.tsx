import { useEffect, useState } from 'react'
import Button from './Button'
import AppState from '../state/AppState'
import Group from '../state/Group'
import GroupMember from '../state/GroupMember'
import { observer } from 'mobx-react-lite'
import NumberInput from './inputs/NumberInput'

type Props = {}

function Roster({ }: Props) {
    const [entity, setEntity] = useState<any>(AppState.instance.currentEntity);

    useEffect(() => {
        setEntity(AppState.instance.currentEntity);
    }, [AppState.instance.currentEntity]);

    return (
        <Button>
            <div>
                Roster
            </div>
            <div style={{ transform: "translateX(-6px)", width: "calc(100% + 11px)", height: 250, overflowY: "scroll" }}>
                {
                    entity.groupMembers.list.map((groupMember: GroupMember) => {
                        return <MemberPanel key={`roster-member-button-${groupMember.id}`} groupMember={groupMember} />;
                    })
                }
            </div>
        </Button>
    )
}

export default observer(Roster);

const MemberPanel = observer(function MemberPanel(props: { groupMember: GroupMember }) {
    const [quantity, setQuantity] = useState<number>(props.groupMember.quantity);
    useEffect(() => { setQuantity(props.groupMember.quantity); }, [props.groupMember, props.groupMember.quantity])
    const unique = props.groupMember.character!.unique;
    return <Button>{unique ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "100%" }}>
                {props.groupMember.character!.name}
            </div>
            <div className="hoverable" style={{ alignSelf: "stretch", alignContent: "center", transform: "translateX(6px)" }}
                onClick={() => {
                    props.groupMember.quantity = 0;
                }}>
                <img alt="" src="./assets/x.png" />
            </div>
        </div>
    ) : (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "100%" }}>
                {props.groupMember.character!.name}
            </div>
            <div style={{ alignSelf: "stretch", alignContent: "center", transform: "translateX(6px)", width: 96 }}>
                <NumberInput value={quantity} onInput={setQuantity} onIdle={(val: number) => { props.groupMember.quantity = val; }} fontSize={24} />
            </div>
        </div>
    )}
    </Button>
});