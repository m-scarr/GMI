import React, { Component } from 'react';
import "./SearchBar.css";

export default class SearchBar extends Component {
    render() {
        return (
            <div className="searchbar-container">
                <input type="text" placeholder={this.props.placeholder} onChange={this.props.onChange} style={{
                    border: '2px solid ' + this.props.color,
                    color: 'white',
                    textShadow: '1px 0 0 black, -1px 0 0 black, 0 1px 0 black, 0 -1px 0 black, 1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black,' +
                        ' 2px 0 1px ' + this.props.color + ', -2px 0 1px ' + this.props.color + ', 0 2px 1px ' + this.props.color + ', 0 -2px 1px ' + this.props.color + ', ' +
                        ' 2px 2px 1px ' + this.props.color + ', -2px 2px 1px ' + this.props.color + ', -2px -2px 1px ' + this.props.color + ', 2px -2px 1px ' + this.props.color
                }} />
            </div>
        )
    }
}
