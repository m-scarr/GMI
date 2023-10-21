import React, { Component } from 'react';
import Button from '../../components/Button';
import Center from '../../components/Center';
import "./style.css";

export let panelInstance;

export class GroupMemberPanel extends Component {
    state = { quantity: 1 };
    constructor(props) {
        super(props);
        panelInstance = this;
    }

    componentDidMount() {
        console.log(this.props.entity)
        this.setState({ quantity: this.props.entity.fields.quantity })
    }

    render() {
        return (
            <Button style={{ display: "flex", paddingTop: 0, paddingBottom: 0 }} hoverable={false}>
                <div className="member-name-container">
                    <Center>
                        {this.props.entity.character.fields.name}
                    </Center>
                </div>
                {this.props.entity.character.fields.unique ?
                    <div className="member-delete-container hoverable" onClick={() => { this.props.entity.set("quantity", 0) }}>
                        <Center>
                            <img alt="Remove Character from Group" src="./assets/x.png" />
                        </Center>
                    </div>
                    :
                    <div className="member-quantity-container">
                        <Center>
                            <input style={{ width: 64 }} type="number" value={this.state.quantity} onChange={(e) => {
                                if (e.target.value < 1) {
                                    this.props.entity.set("quantity", 0);
                                } else {
                                    this.setState({ quantity: e.target.value });
                                }
                            }} onBlur={(e) => { this.props.entity.set("quantity", e.target.value); }} />
                        </Center>
                    </div>}
            </Button>
        )
    }
}
