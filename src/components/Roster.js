import React, { Component } from 'react';
import Button from "./Button";
import "./Roster.css";

export default class Roster extends Component {
    componentDidMount() {
        //this.props.entity.updateNonMembers();
    }

    render() {
        return (
            <Button hoverable={false} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className="roster-title-container">Roster</div>
                <div className="roster-members-container">
                    {this.props.entity.groupMembers.map((groupMember) => {
                        return groupMember.panel;
                    })}
                </div>
            </Button>
        )
    }
}
