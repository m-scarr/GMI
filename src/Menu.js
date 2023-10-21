import React, { Component } from 'react';
import MenuHeader from './components/MenuHeader';
import SearchBar from './components/SearchBar';
import "./Menu.css"
import { NameInput } from './components/NameInput';
import AddButton from "./components/AddButton";
import { Options } from './Options';

export let menuInstance;

export class Menu extends Component {
    constructor(props) {
        super(props);
        menuInstance = this;
    }
    render() {
        return (
            <div className="menu-container">
                <MenuHeader app={this.props.app} />
                {this.props.app.state.currentView === "options" || this.props.app.state.currentEntity !== null ? null :
                    <SearchBar
                        onChange={(e) => { console.log(e.target.value) }}
                        color={this.props.app.refObj[this.props.app.state.currentView].color}
                        placeholder={'Search ' + this.props.app.refObj[this.props.app.state.currentView].name} />}
                {this.props.app.state.currentEntity !== null ? <NameInput entity={this.props.app.state.currentEntity} /> : null}
                <div className="menu-entity-container" style={{ height: this.props.app.state.currentView === 'options' ? 'calc(100% - 80px)' : 'calc(100% - 112px)' }}>
                    {this.props.app.state.currentView === "options" ? <Options app={this.props.app} /> : this.props.app.state.currentEntity !== null ? null : this.props.app.state.currentGame[this.props.app.state.currentView].map((entity) => {
                        return entity.button;
                    })}
                    {this.props.app.state.currentEntity === null && this.props.app.state.currentView !== "options" ? <AddButton app={this.props.app} /> : null}
                    {this.props.app.state.currentEntity !== null ? this.props.app.state.currentEntity.panel : null}
                </div>
            </div >
        )
    }
}
