import React, { Component } from 'react'
import "./MenuHeader.css";

export default class MenuHeader extends Component {
    handleClick(e) {
        this.props.app.set("currentView", e.target.attributes.category.value, () => {
            this.props.app.set("currentEntity", null)
        })
    }
    render() {
        return (
            <div className="menu-header-container">
                <div className="menu-header-title-container" style={{ backgroundColor: this.props.app.refObj[this.props.app.state.currentView].color }}>
                    {this.props.app.refObj[this.props.app.state.currentView].name}
                    {this.props.app.state.currentGame !== null && this.props.app.state.currentGame.online ? <img alt="Refresh" src="./assets/refresh.png" className="hoverable refresh" onClick={() => { this.props.app.refresh() }} /> : null}
                </div>
                <div className="menu-header-options-container">
                    {
                        Object.keys(this.props.app.refObj).map((cat) => {
                            return <div key={"cat-container-" + cat} className="menu-header-category-container" style={{ backgroundColor: this.props.app.refObj[cat].color }} onClick={this.handleClick.bind(this)}>
                                <img className={cat !== this.props.app.state.currentView ? "hoverable" : ""} alt={this.props.app.refObj[cat].name} src={this.props.app.refObj[cat].defaultMarkerSrc}
                                    category={cat} />
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}
