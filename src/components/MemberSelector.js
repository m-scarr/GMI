import React, { Component } from 'react';
import GroupMember from "../entities/GroupMember";
import Button from "./Button";
import "./MemberSelector.css";

export default class MemberSelector extends Component {
    componentDidMount() {
        this.props.entity.updateNonMembers();
    }

    render() {
        return (
            <Button hoverable={false} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className="member-selector-title-container">Select Member</div>
                <div className="member-selector-members">
                    {this.props.entity.nonMembers.map((nonMember) => {
                        return (
                            <Button key={"non-member-" + this.props.entity.id + "-" + nonMember.id} onClick={() => {
                                GroupMember.create(this.props.entity.game, this.props.entity, nonMember, () => {
                                    this.props.entity.updateNonMembers();
                                })
                            }}>
                                {nonMember.fields.name}
                            </Button>
                        );
                    })}</div>
            </Button>
        )
    }
}
